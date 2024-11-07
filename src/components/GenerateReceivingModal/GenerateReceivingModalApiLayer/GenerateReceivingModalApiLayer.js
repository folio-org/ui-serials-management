import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import { FormattedMessage } from 'react-intl';

import { useOkapiKy, useCallout } from '@folio/stripes/core';

import { useHoldings, useLocations } from '../../../hooks';

import {
  PIECE_SET_ENDPOINT,
  RECEIVING_PIECES_ENDPOINT,
} from '../../../constants/endpoints';

import { GenerateReceivingModal } from '../GenerateReceivingModal';

const propTypes = {
  orderLine: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  pieceSet: PropTypes.object,
};

const GenerateReceivingModalApiLayer = ({
  orderLine,
  open,
  onClose,
  pieceSet,
}) => {
  const ky = useOkapiKy();
  const queryClient = useQueryClient();
  const callout = useCallout();

  const { data: locations } = useLocations();

  const holdingIds = orderLine?.remoteId_object?.locations?.[0]?.holdingId
    ? orderLine?.remoteId_object?.locations?.map((hi) => hi?.holdingId)
    : [];

  const { data: holdings } = useHoldings(holdingIds);

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

  return (
    <GenerateReceivingModal
      apiLayer={{
        locations,
        holdings,
        submitReceivingIds,
        submitReceivingPiece,
      }}
      onClose={onClose}
      open={open}
      orderLine={orderLine}
      pieceSet={pieceSet}
    />
  );
};

GenerateReceivingModalApiLayer.propTypes = propTypes;

export default GenerateReceivingModalApiLayer;
