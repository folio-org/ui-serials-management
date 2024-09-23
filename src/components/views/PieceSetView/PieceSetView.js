import { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from 'react-query';
import { useOkapiKy, useStripes } from '@folio/stripes/core';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  Pane,
  LoadingPane,
  Button,
  Icon,
  ConfirmationModal,
} from '@folio/stripes/components';
import { DEFAULT_VIEW_PANE_WIDTH } from '../../../constants/config';
import { PieceSetInfo, PiecesList } from '../../PieceSetSections';

import GenerateReceivingModal from '../../GenerateReceivingModal/GenerateReceivingModal';
import {
  SERIAL_ENDPOINT,
  PIECE_SET_ENDPOINT,
} from '../../../constants/endpoints';

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
  const stripes = useStripes();
  const intl = useIntl();
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showReceivingModal, setShowReceivingModal] = useState(false);

  const { data: serial, isLoading: serialLoading } = useQuery(
    [
      'ui-serials-management',
      'PieceSetView',
      'generateReceving',
      pieceSet?.ruleset?.owner?.id,
    ],
    () => ky.get(SERIAL_ENDPOINT(pieceSet?.ruleset?.owner?.id)).json(),
    { enabled: !!pieceSet?.ruleset?.owner?.id }
  );

  const { mutateAsync: deletePieceSet } = useMutation(
    ['ui-serials-management', 'PieceSetView', 'deletePieceSet', pieceSet?.id],
    () => {
      ky.delete(PIECE_SET_ENDPOINT(pieceSet?.id));
    }
  );

  const handleDelete = async () => {
    await deletePieceSet(pieceSet?.id);
  };

  const getHoldingIds = () => {
    if (serial?.orderLine?.remoteId_object?.locations?.[0]?.holdingId) {
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
      pieceSet: { ...pieceSet, titleId: serial?.orderLine?.titleId },
    };
  };

  if (isLoading) {
    return <LoadingPane dismissible onClose={onClose} />;
  }

  const renderActionMenu = () => {
    const buttons = [];
    buttons.push(
      <Button
        key="generate-receiving-option"
        buttonStyle="dropdownItem"
        disabled={!serial?.orderLine?.remoteId_object || serialLoading}
        id="clickable-dropdown-generate-receiving"
        onClick={() => setShowReceivingModal(true)}
      >
        <Icon icon="edit">
          <FormattedMessage id="ui-serials-management.pieceSets.generateReceivingPieces" />
        </Icon>
      </Button>
    );
    if (stripes?.hasPerm('ui-serials-management.predictedpieces.edit')) {
      buttons.push(
        <Button
          key="delete-piece-set-option"
          buttonStyle="dropdownItem"
          // disabled={}
          id="clickable-dropdown-delete-piece-set"
          onClick={() => setShowDeleteConfirmModal(true)}
        >
          <Icon icon="edit">
            <FormattedMessage id="ui-serials-management.pieceSets.deletePredictedPieceSet" />
          </Icon>
        </Button>
      );
    }
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
      <ConfirmationModal
        cancelLabel={<FormattedMessage id="ui-serials-management.cancel" />}
        confirmLabel={<FormattedMessage id="ui-serials-management.delete" />}
        heading={intl.formatMessage({
          id: 'ui-serials-management.pieceSets.deletePredictedPieceSet',
        })}
        id="delete-piece-set-confirmation"
        message={
          <FormattedMessage id="ui-serials-management.pieceSets.deletePredictedPieceSet.confirmMessage" />
        }
        onCancel={() => setShowDeleteConfirmModal(false)}
        onConfirm={handleDelete}
        open={showDeleteConfirmModal}
      />
    </>
  );
};

PieceSetView.propTypes = propTypes;

export default PieceSetView;
