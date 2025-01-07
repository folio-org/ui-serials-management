import { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useOkapiKy } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';
import { Pane, LoadingPane, Button, Icon } from '@folio/stripes/components';
import { DEFAULT_VIEW_PANE_WIDTH } from '../../../constants/config';
import { INTERNAL_COMBINATION_PIECE } from '../../../constants/internalPieceClasses';

import { PieceSetInfo, PiecesList } from '../../PieceSetSections';

import GenerateReceivingModal from '../../GenerateReceivingModal/GenerateReceivingModal';
import { SERIAL_ENDPOINT } from '../../../constants/endpoints';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  resource: PropTypes.object,
  queryProps: PropTypes.object,
};

const PieceSetView = ({
  resource: pieceSet,
  onClose,
  queryProps: { isLoading },
}) => {
  const ky = useOkapiKy();
  const [showReceivingModal, setShowReceivingModal] = useState(false);

  const { data: serial, isLoading: serialLoading } = useQuery(
    [
      'ui-serials-management',
      'GenerateReceivingModal',
      pieceSet?.ruleset?.owner?.id,
    ],
    () => ky.get(SERIAL_ENDPOINT(pieceSet?.ruleset?.owner?.id)).json(),
    { enabled: !!pieceSet?.ruleset?.owner?.id }
  );

  const getHoldingIds = () => {
    if (serial?.orderLine?.remoteId_object?.locations?.[0]?.holdingId) {
      return serial?.orderLine?.remoteId_object?.locations?.map(
        (hi) => hi?.holdingId
      );
    } else {
      return null;
    }
  };

  const sortedPieces = pieceSet?.pieces
    // Itereate through the pieces and find combination pieces
    ?.map((p) => {
      return p?.class === INTERNAL_COMBINATION_PIECE
        ? {
          ...p,
          // Sort combination piece's recurrence pieces by date
          recurrencePieces: p?.recurrencePieces?.sort((a, b) => (a?.date < b?.date ? -1 : 1)),
        }
        : p;
    })
    .sort((a, b) => {
      // Sort all pieces by date or by the recurrence pieces of a combination piece
      return (a?.class === INTERNAL_COMBINATION_PIECE
        ? a?.recurrencePieces[0]?.date
        : a?.date) <
        (b?.class === INTERNAL_COMBINATION_PIECE
          ? b?.recurrencePieces[0]?.date
          : b?.date)
        ? -1
        : 1;
    });

  const getSectionProps = (name) => {
    return {
      id: `piece-set-section-${name}`,
      pieceSet: {
        ...pieceSet,
        // This is a bit annoying with regard to the sorting that needs to be done
        // Grails doesnt like attempting to sort uniderectional one to many relationships
        pieces: sortedPieces,
        titleId: serial?.orderLine?.titleId,
      },
    };
  };

  if (isLoading) {
    return <LoadingPane dismissible onClose={onClose} />;
  }

  const renderActionMenu = () => {
    const buttons = [];
    buttons.push(
      <Button
        key="edit-serial-option"
        buttonStyle="dropdownItem"
        disabled={!serial?.orderLine?.remoteId_object || serialLoading}
        id="clickable-dropdown-edit-serial"
        onClick={() => setShowReceivingModal(true)}
      >
        <Icon icon="edit">
          <FormattedMessage id="ui-serials-management.pieceSets.generateReceivingPieces" />
        </Icon>
      </Button>
    );
    return buttons.length ? buttons : null;
  };

  return (
    <>
      <Pane
        actionMenu={renderActionMenu}
        defaultWidth={DEFAULT_VIEW_PANE_WIDTH}
        dismissible
        onClose={onClose}
        paneTitle={
          pieceSet?.title ? (
            <>{`${pieceSet?.title} (${pieceSet?.dateCreated})`}</>
          ) : (
            <>{`${pieceSet?.id} (${pieceSet?.dateCreated})`}</>
          )
        }
      >
        <PieceSetInfo key="piece-set-info" {...getSectionProps('info')} />
        <PiecesList key="pieces-list" {...getSectionProps('pieces-list')} />
      </Pane>
      <GenerateReceivingModal
        {...getSectionProps('generate-receiving-modal')}
        holdingIds={getHoldingIds()}
        serial={serial}
        setShowModal={setShowReceivingModal}
        showModal={showReceivingModal}
      />
    </>
  );
};

PieceSetView.propTypes = propTypes;

export default PieceSetView;
