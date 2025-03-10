import { useMemo } from 'react';
import PropTypes from 'prop-types';
import arrayMutators from 'final-form-arrays';
import { useMutation, useQueryClient } from 'react-query';
import { FormattedMessage } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';

import { useOkapiKy, useCallout } from '@folio/stripes/core';

import { FormModal } from '@k-int/stripes-kint-components';
import { Button, ModalFooter, Spinner } from '@folio/stripes/components';
import {
  useCentralOrderingSettings,
  useInstanceHoldingsQuery,
  useLocationsQuery,
  useConsortiumTenants,
} from '@folio/stripes-acq-components';

import GenerateReceivingModalForm from '../GenerateReceivingModalForm';
import GenerateReceivingModalInfo from '../GenerateReceivingModalInfo';

import {
  PIECE_SET_ENDPOINT,
  BATCH_RECEIVING_PIECES_ENDPOINT
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
  const { tenants = [] } = useConsortiumTenants({
    enabled: isCentralOrderingEnabled,
  });
  const { holdings = [] } = useInstanceHoldingsQuery(
    orderLine?.remoteId_object?.instanceId,
    { consortium: isCentralOrderingEnabled }
  );

  const { locations = [] } = useLocationsQuery({
    consortium: isCentralOrderingEnabled,
  });

  // Good lord this is a bit of a mind bender
  // Since we cant filter the locations paticularly well using the hook search params
  // We have to filter the holdings and locations in the front end

  // Filtering holdings/locaitons for non ecs environments
  // First filter the holdings by id, checking if holdingId exist in POL locations
  const filteredHoldings = useMemo(() => {
    return holdings?.filter((h) => orderLine?.remoteId_object?.locations?.some((rol) => {
      if (rol?.tenantId) {
        return rol?.holdingId === h?.id && rol?.tenantId === h?.tenantId;
      }
      return rol?.holdingId === h?.id;
    }));
  }, [holdings, orderLine?.remoteId_object?.locations]);

  // Filter locations the same way we did with holdings
  // location?.id being comapred against the POL locations arrays location?.id
  // We will also need to filter these for the locations that are the permanentLocationIds on a given holding
  const filteredLocations = useMemo(() => {
    return locations?.filter(
      (l) => orderLine?.remoteId_object?.locations?.some((rol) => {
        if (rol?.tenantId) {
          return rol?.locationId === l?.id && rol?.tenantId === l?.tenantId;
        }
        return rol?.locationId === l?.id;
      }) ||
        filteredHoldings?.some((h) => {
          if (h?.tenantId) {
            return (
              l?.id === h?.permanentLocationId && l?.tenantId === h?.tenantId
            );
          }
          return l?.id === h?.permanentLocationId;
        })
    );
  }, [filteredHoldings, locations, orderLine?.remoteId_object?.locations]);

  // Taking consortium holdings/locations and extracting the tenantIds within those from the list of tenants
  const filteredTenants = useMemo(() => {
    return (
      tenants?.filter(
        (t) => filteredLocations?.some((l) => l?.tenantId === t?.id) ||
          filteredHoldings?.some((l) => l?.tenantId === t?.id)
      ) || []
    );
  }, [tenants, filteredLocations, filteredHoldings]);

  const { mutateAsync: submitReceivingPieces } = useMutation(
    ['ui-serials-management', 'GeneratingReceivingModal', 'submitReceivingPieces'],
    (data) => ky.post(
      `${BATCH_RECEIVING_PIECES_ENDPOINT}${data.createItem ? '?createItem=true' : ''}`,
      { json: { pieces: data.pieces } }
    ).json()
  );

  const { mutateAsync: submitReceivingIds } = useMutation(
    ['ui-serials-management', 'GeneratingReceivingModal', 'submitReceivingId'],
    (data) => ky
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
      const singleLocation = orderLine?.remoteId_object?.locations?.[0];
      if (singleLocation?.holdingId) {
        return {
          holdingId: singleLocation?.holdingId,
          ...(singleLocation?.tenantId && {
            receivingTenantId: singleLocation?.tenantId,
          }),
          ...fixedInitialValues,
        };
      } else {
        return {
          locationId: singleLocation?.locationId,
          ...(singleLocation?.tenantId && {
            receivingTenantId: singleLocation?.tenantId,
          }),
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
      id: uuidv4(),
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
      ...(values?.receivingTenantId && {
        receivingTenantId: values?.receivingTenantId,
      }),
    };
  };

  const handleGeneration = async (values) => {
    try {
      const piecesArray = (pieceSet?.pieces || [])
        .filter(piece => piece?.class !== INTERNAL_OMISSION_PIECE)
        .map(piece => {
          const formattedPiece = formatReceivingPiece(piece, values);
          return { originalPiece: piece, formattedPiece };
        });

      await submitReceivingPieces({
        pieces: piecesArray.map(p => p.formattedPiece),
        createItem: values?.createItem,
      });

      const updatedPieces = piecesArray.map(p => ({
        ...p.originalPiece,
        receivingPieces: [
          ...(p.originalPiece?.receivingPieces || []),
          { receivingId: p.formattedPiece.id },
        ],
      }));

      await submitReceivingIds({ id: pieceSet?.id, pieces: updatedPieces });
    } catch (e) {
      const { errors } = await e.response.json();
      errors?.map((error) => callout.sendCallout({
        message: (
          <>
            <FormattedMessage id="ui-serials-management.pieceSets.generateReceivingErrorMessage" />
            {error?.message}
          </>
        ),
        type: 'error',
        timeout: 0,
      }));
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
        holdings={filteredHoldings}
        locations={filteredLocations}
        orderLine={orderLine}
        tenants={filteredTenants}
      />
    </FormModal>
  );
};

GenerateReceivingModal.propTypes = propTypes;

export default GenerateReceivingModal;
