import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
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
import { urls, sortPieces } from '../../utils';

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
  const history = useHistory();
  const location = useLocation();
  const queryClient = useQueryClient();

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
      ky.delete(PIECE_SET_ENDPOINT(pieceSet?.id)).then(() => queryClient.invalidateQueries([
        '@folio/serials-management',
        'SASQ',
        'piece-sets',
        'viewAll',
      ]));
    }
  );

  const handleDelete = async () => {
    await deletePieceSet(pieceSet?.id);
    history.push(`${urls.pieceSets()}${location.search}`);
  };

  const sortedPieces = useMemo(() => sortPieces(pieceSet?.pieces), [pieceSet]);

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
    // Check to see if pieceset contains pieces that have been generated in receiving
    const hasReceiving = pieceSet?.pieces?.some(
      (p) => p?.receivingPieces?.length >= 1
    );

    if (stripes?.hasPerm('ui-serials-management.predictedpieces.edit')) {
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
    }
    if (stripes?.hasPerm('ui-serials-management.predictedpieces.delete')) {
      buttons.push(
        <Button
          key="delete-piece-set-option"
          buttonStyle="dropdownItem"
          disabled={hasReceiving}
          id="clickable-dropdown-delete-piece-set"
          onClick={() => setShowDeleteConfirmModal(true)}
        >
          <Icon icon="trash">
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
        {...getSectionProps('generate-receiving-modal')}
        orderLine={serial?.orderLine}
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
