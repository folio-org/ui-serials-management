import PropTypes from 'prop-types';
import arrayMutators from 'final-form-arrays';
import { useMutation, useQueryClient } from 'react-query';
import { FormattedMessage } from 'react-intl';

import { useOkapiKy, useCallout } from '@folio/stripes/core';

import { FormModal } from '@k-int/stripes-kint-components';
import { Button, ModalFooter, Spinner } from '@folio/stripes/components';
import {
  useCentralOrderingSettings,
  useConsortiumLocations,
  useConsortiumInstanceHoldings,
  useInstanceHoldings,
  useLocations,
} from '@folio/stripes-acq-components';

import GenerateReceivingModalForm from '../GenerateReceivingModalForm';
import GenerateReceivingModalInfo from '../GenerateReceivingModalInfo';

import {
  PIECE_SET_ENDPOINT,
  RECEIVING_PIECES_ENDPOINT,
} from '../../../constants/endpoints';
import {
  INTERNAL_COMBINATION_PIECE,
  INTERNAL_OMISSION_PIECE,
} from '../../../constants/internalPieceClasses';

const propTypes = {
  orderLine: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  pieceSet: PropTypes.object,
};

const GenerateReceivingModal = ({ orderLine, open, onClose, pieceSet }) => {
  const ky = useOkapiKy();
  const queryClient = useQueryClient();
  const callout = useCallout();

  // Hooks to be used within an environment when cental ordering is enabled
  const { enabled: isCentralOrderingEnabled } = useCentralOrderingSettings();
  const { tenants: consortiumTenants } = useConsortiumTenants({
    enabled: isCentralOrderingEnabled,
  });
  const { locations: consortiumLocations } = useConsortiumLocations({
    enabled: isCentralOrderingEnabled,
  });
  const { holdings: consortiumHoldings } = useConsortiumInstanceHoldings(
    orderLine?.remoteId_object?.instanceId,
    { enabled: isCentralOrderingEnabled }
  );

  // Hooks to be used outside of a central ordering environment
  const { locations } = useLocations({ enabled: !isCentralOrderingEnabled });
  const { holdings } = useInstanceHoldings(
    orderLine?.remoteId_object?.instanceId,
    { enabled: !isCentralOrderingEnabled }
  );

  const { mutateAsync: submitReceivingPiece } = useMutation(
    [
      'ui-serials-management',
      'GeneratingReceivingModal',
      'submitReceivingPiece',
    ],
    (data) => {
      return ky
        .post(
          `${RECEIVING_PIECES_ENDPOINT}${data?.createItem ? '?createItem=true' : ''}`,
          { json: data?.receiving }
        )
        .json();
    }
  );

  const { mutateAsync: submitReceivingIds } = useMutation(
    ['ui-serials-management', 'GeneratingReceivingModal', 'submitReceivingId'],
    (data) =>
      ky
        .put(PIECE_SET_ENDPOINT(pieceSet?.id), { json: data })
        .json()
        .then(() => {
          queryClient.invalidateQueries([
            '@folio/serials-management',
            'SASQ',
            'piece-sets',
            'view',
            pieceSet?.id,
          ]);
          callout.sendCallout({
            message: (
              <FormattedMessage
                id="ui-serials-management.pieceSets.countReceivingGenerated"
                values={{ count: data?.pieces?.length }}
              />
            ),
          });
          onClose();
        })
  );

  const getInitialValues = () => {
    const fixedInitialValues = {
      format: 'Physical',
      supplement: false,
      displayOnHolding: false,
      displayToPublic: false,
    };
    if (orderLine?.remoteId_object?.locations?.length === 1) {
      if (holdings) {
        return {
          holdingId: orderLine?.remoteId_object?.locations?.[0]?.holdingId,
          ...fixedInitialValues,
        };
      } else {
        return {
          locationId: orderLine?.remoteId_object?.locations?.[0]?.locationId,
          ...fixedInitialValues,
        };
      }
    }
    return { ...fixedInitialValues };
  };

  // TODO Use dayjs
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + Number(days));
    return result;
  };

  const formatReceivingPiece = (piece, values) => {
    const pieceInfo = {
      label: piece?.label,
      date: addDays(
        piece?.class === INTERNAL_COMBINATION_PIECE
          ? piece?.recurrencePieces[0]?.date
          : piece?.date,
        values?.interval
      ),
    };

    return {
      ...(values?.createItem && { createItem: values.createItem }),
      receiving: {
        poLineId: orderLine?.remoteId,
        titleId: orderLine?.titleId,
        format: values?.format,
        displayOnHolding: values?.displayOnHolding,
        displayToPublic: values?.displayToPublic,
        supplement: values?.supplement,
        displaySummary: pieceInfo?.label,
        receiptDate: pieceInfo?.date,
        ...(values?.holdingId && { holdingId: values?.holdingId }),
        ...(values?.locationId && { locationId: values?.locationId }),
      },
      piece,
    };
  };

  const handleGeneration = async (values) => {
    try {
      const piecesArray = await Promise.all(
        (pieceSet?.pieces || [])
          .map((piece) => {
            if (piece?.class !== INTERNAL_OMISSION_PIECE) {
              return formatReceivingPiece(piece, values);
            } else {
              return null;
            }
          })
          .filter(Boolean)
          // Set up an array of Promises that will call receieving sequentially and respond
          // Then take that response and transform. We Promise.all to then have an array to send to our backend
          .map(async (pieceInReceivingShape) => {
            let returnObj;
            await submitReceivingPiece(pieceInReceivingShape).then((res) => {
              returnObj = {
                ...pieceInReceivingShape?.piece,
                receivingPieces: [
                  ...(pieceInReceivingShape?.piece?.receivingPieces || []),
                  { receivingId: res?.id },
                ],
              };
            });
            return returnObj;
          })
      );
      await submitReceivingIds({ id: pieceSet?.id, pieces: piecesArray });
    } catch (e) {
      const { errors } = await e.response.json();
      errors?.map((error) =>
        callout.sendCallout({
          message: (
            <>
              <FormattedMessage id="ui-serials-management.pieceSets.generateReceivingErrorMessage" />
              {error?.message}
            </>
          ),
          type: 'error',
          timeout: 0,
        })
      );
    }
  };

  const renderFooter = ({ formState, handleSubmit, handleClose }) => {
    const { invalid, pristine, submitting } = formState;
    return (
      <ModalFooter>
        <Button
          buttonStyle="primary"
          disabled={submitting || invalid || pristine}
          id="generate-recieving-pieces-button"
          marginBottom0
          onClick={handleSubmit}
          type="submit"
        >
          {!submitting ? (
            <FormattedMessage id="ui-serials-management.pieceSets.generateReceivingPieces" />
          ) : (
            <Spinner />
          )}
        </Button>
        <Button disabled={submitting} marginBottom0 onClick={handleClose}>
          <FormattedMessage id="ui-serials-management.close" />
        </Button>
      </ModalFooter>
    );
  };

  return (
    <FormModal
      initialValues={getInitialValues()}
      modalProps={{
        onClose,
        open,
        label: (
          <FormattedMessage id="ui-serials-management.pieceSets.generateReceivingPieces" />
        ),
        footer: renderFooter,
      }}
      mutators={arrayMutators}
      onSubmit={handleGeneration}
    >
      <GenerateReceivingModalInfo
        orderLineLocations={orderLine?.remoteId_object?.locations}
        pieceSet={pieceSet}
      />
      <GenerateReceivingModalForm
        tenants={consortiumTenants}
        holdings={isCentralOrderingEnabled ? consortiumHoldings : holdings}
        locations={isCentralOrderingEnabled ? consortiumLocations : locations}
        orderLine={orderLine}
      />
    </FormModal>
  );
};

GenerateReceivingModal.propTypes = propTypes;

export default GenerateReceivingModal;
