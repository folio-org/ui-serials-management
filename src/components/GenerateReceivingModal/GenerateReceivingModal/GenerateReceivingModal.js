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
  useConsortiumTenants,
} from '@folio/stripes-acq-components';

import { useLocationsWithQueryParams } from '../../../hooks';
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
  const { tenants = [] } = useConsortiumTenants({ enabled: isCentralOrderingEnabled });

  const { holdings = [] } = useInstanceHoldingsQuery(orderLine?.remoteId_object?.instanceId, {
    consortium: isCentralOrderingEnabled,
  });

  const locationQueryParams = useMemo(() => {
    const locationIds = orderLine?.remoteId_object?.locations?.map(loc => loc.locationId).filter(Boolean);

    if (locationIds?.length > 0) {
      return { query: locationIds.map(id => `id==${id}`).join(' or ') };
    }
    return {};
  }, [orderLine?.remoteId_object?.locations]);

  // fetch locations with backend filtering
  const { locations = [] } = useLocationsWithQueryParams(locationQueryParams, {
    consortium: isCentralOrderingEnabled,
    options: { enabled: !!orderLine?.remoteId_object },
  });

  // Filter holdings by checking if holdingId exists in POL locations
  const filteredHoldings = useMemo(() => {
    return holdings?.filter((h) => orderLine?.remoteId_object?.locations?.some((rol) => {
      if (rol?.tenantId) {
        return rol?.holdingId === h?.id && rol?.tenantId === h?.tenantId;
      }
      return rol?.holdingId === h?.id;
    }));
  }, [holdings, orderLine?.remoteId_object?.locations]);

  // Taking consortium holdings/locations and extracting the tenantIds within those from the list of tenants
  const filteredTenants = useMemo(() => {
    return (
      tenants?.filter(
        (t) => locations?.some((l) => l?.tenantId === t?.id) ||
          filteredHoldings?.some((l) => l?.tenantId === t?.id)
      ) || []
    );
  }, [tenants, locations, filteredHoldings]);

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
        locations={locations}
        orderLine={orderLine}
        tenants={filteredTenants}
      />
    </FormModal>
  );
};

GenerateReceivingModal.propTypes = propTypes;

export default GenerateReceivingModal;
