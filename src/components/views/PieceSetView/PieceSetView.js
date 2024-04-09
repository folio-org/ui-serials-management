import { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useOkapiKy } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';
import { Pane, LoadingPane, Button, Icon } from '@folio/stripes/components';
import { DEFAULT_VIEW_PANE_WIDTH } from '../../../constants/config';
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
    () => ky.get(SERIAL_ENDPOINT(pieceSet?.ruleset?.owner?.id)).json()
  );

  const getHoldingIds = () => {
    if (serial?.orderLine?.remoteId_object?.locations[0]?.holdingId) {
      return serial?.orderLine?.remoteId_object?.locations?.map(
        (hi) => hi?.holdingId
      );
    } else {
      return null;
    }
  };

  const getSectionProps = (name) => {
    return {
      id: `piece-set-section-${name}`,
      pieceSet,
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
        holdingIds={getHoldingIds()}
        pieceSet={pieceSet}
        serial={serial}
        setShowModal={setShowReceivingModal}
        showModal={showReceivingModal}
      />
    </>
  );
};

PieceSetView.propTypes = propTypes;

export default PieceSetView;
