import { createRef, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { AppIcon, CalloutContext, useOkapiKy, useStripes } from '@folio/stripes/core';
import {
  Pane,
  LoadingPane,
  Button,
  ConfirmationModal,
  Icon,
  MetaSection,
  expandAllSections,
  collapseAllSections,
  HasCommand,
  checkScope,
  AccordionStatus,
  AccordionSet,
} from '@folio/stripes/components';

import {
  PublicationPattern,
  DeprecatedPublicationPatterns,
  SerialInfo,
  SerialPOLine,
  SerialPieceSets,
  SerialNotes,
} from '../../SerialSections';
import PiecesPreviewModal from '../../PiecesPreviewModal';
import { urls } from '../../utils';
import { DEFAULT_VIEW_PANE_WIDTH } from '../../../constants/config';
import { PIECE_SETS_ENDPOINT, SERIAL_ENDPOINT } from '../../../constants/endpoints';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  resource: PropTypes.object,
  queryProps: PropTypes.object,
};

const SerialView = ({
  resource: serial,
  onClose,
  queryProps: { isLoading },
}) => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const stripes = useStripes();
  const accordionStatusRef = createRef();
  const ky = useOkapiKy();
  const queryClient = useQueryClient();
  const callout = useContext(CalloutContext);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

  const serialPath = SERIAL_ENDPOINT(serial?.id);

  const { data: existingPieceSets, existingPieceSetsLoading } = useQuery(
    ['ui-serials-management', 'SerialView', serial?.id],
    () => ky
      .get(`${PIECE_SETS_ENDPOINT}?filters=ruleset.owner.id==${serial?.id}`)
      .json()
  );

  const { mutateAsync: deleteSerial } = useMutation(
    [serialPath, 'ui-serials-management', 'SerialView', 'deleteSerial'],
    () => ky
      .delete(serialPath)
      .then(() => queryClient.invalidateQueries(['@folio/serials-management', 'SASQ', 'viewAll']))
  );

  const handleEdit = () => {
    history.push(`${urls.serialEdit(params?.id)}${location.search}`);
  };

  const handleDelete = () => {
    if (serial.serialRulesets?.length) {
      callout.sendCallout({
        type: 'error',
        timeout: 0,
        message: (
          <FormattedMessage id="ui-serials-management.serials.deleteSerial.error.hasPublicationPattern" />
        ),
      });
      return;
    }

    deleteSerial()
      .then(() => {
        history.push(`${urls.serials()}${location.search}`);
        callout.sendCallout({
          message: (
            <FormattedMessage
              id="ui-serials-management.serials.deleteSerial.success"
              values={{ serial: serial.orderLine?.title ?? serial.id }}
            />
          ),
        });
      })
      .catch((error) => {
        callout.sendCallout({
          type: 'error',
          timeout: 0,
          message: (
            <FormattedMessage
              id="ui-serials-management.serials.deleteSerial.error.noDeleteSerialBackendError"
              values={{ message: error.message }}
            />
          ),
        });
      });
  };

  const getSectionProps = (name) => {
    return {
      id: `serial-section-${name}`,
      serial,
    };
  };

  // istanbul ignore next
  const shortcuts = [
    { name: 'edit', handler: () => handleEdit() },
    {
      name: 'expandAllSections',
      handler: (e) => expandAllSections(e, accordionStatusRef),
    },
    {
      name: 'collapseAllSections',
      handler: (e) => collapseAllSections(e, accordionStatusRef),
    },
  ];

  const renderActionMenu = ({ onToggle }) => {
    const buttons = [];
    if (stripes.hasPerm('ui-serials-management.serials.edit')) {
      buttons.push(
        <Button
          key="edit-serial"
          buttonStyle="dropdownItem"
          id="clickable-dropdown-edit-serial"
          onClick={handleEdit}
        >
          <Icon icon="edit">
            <FormattedMessage id="ui-serials-management.edit" />
          </Icon>
        </Button>
      );
      if (stripes.hasPerm('ui-serials-management.predictedpieces.edit')) {
        buttons.push(
          <Button
            key="generate-pieces"
            buttonStyle="dropdownItem"
            disabled={
              !serial?.serialRulesets?.some(
                (sr) => sr?.rulesetStatus?.value === 'active'
              )
            }
            id="clickable-dropdown-generate-pieces"
            onClick={() => setShowModal(true)}
          >
            <Icon icon="replace">
              <FormattedMessage id="ui-serials-management.ruleset.generatePredictedPieces" />
            </Icon>
          </Button>
        );
      }
    }

    if (stripes.hasPerm('ui-serials-management.serials.manage')) {
      buttons.push(
        <Button
          key="delete-serial"
          buttonStyle="dropdownItem"
          id="clickable-dropdown-delete-serial"
          onClick={() => {
            setShowDeleteConfirmationModal(true);
            onToggle();
          }}
        >
          <Icon icon="trash">
            <FormattedMessage id="ui-serials-management.delete" />
          </Icon>
        </Button>
      );
    }
    return buttons.length ? buttons : null;
  };

  if (isLoading) {
    return <LoadingPane dismissible onClose={onClose} />;
  }

  return (
    <>
      <HasCommand
        commands={shortcuts}
        isWithinScope={checkScope}
        scope={document.body}
      >
        <Pane
          actionMenu={renderActionMenu}
          appIcon={
            <AppIcon app="serials-management" iconKey="app" size="small" />
          }
          defaultWidth={DEFAULT_VIEW_PANE_WIDTH}
          dismissible
          onClose={onClose}
          paneSub={
            serial?.orderLine?.remoteId_object?.poLineNumber && (
              <>
                <FormattedMessage id="ui-serials-management.poLine" />
                {' - '}
                {serial.orderLine.remoteId_object.poLineNumber}
              </>
            )
          }
          paneTitle={
            serial?.orderLine?.title ? (
              <>
                <FormattedMessage id="ui-serials-management.serials.title" />
                {' - '}
                {serial?.orderLine?.title}
              </>
            ) : (
              <>
                <FormattedMessage id="ui-serials-management.serials.serial" />
                {' - '}
                {serial?.id}
              </>
            )
          }
        >
          <MetaSection
            contentId="serialMetaContent"
            createdDate={serial?.dateCreated}
            hideSource
            lastUpdatedDate={serial?.lastUpdated}
          />
          <SerialInfo {...getSectionProps('info')} />
          <AccordionStatus ref={accordionStatusRef}>
            <AccordionSet>
              {!!serial?.orderLine?.remoteId && (
                <SerialPOLine {...getSectionProps('po-line')} />
              )}
              <PublicationPattern {...getSectionProps('publication-pattern')} />
              {!!serial?.serialRulesets?.find(
                (sr) => sr?.rulesetStatus?.value === 'deprecated'
              ) && (
              <DeprecatedPublicationPatterns
                {...getSectionProps('deprecated-publication-pattern')}
              />
              )}
              {!!existingPieceSets?.length && !existingPieceSetsLoading && (
                <SerialPieceSets
                  id="serial-section-serial-piece-sets"
                  pieceSets={existingPieceSets}
                />
              )}
              <SerialNotes {...getSectionProps('notes')} />
            </AccordionSet>
          </AccordionStatus>
        </Pane>
      </HasCommand>
      <ConfirmationModal
        buttonStyle="danger"
        confirmLabel={<FormattedMessage id="ui-serials-management.delete" />}
        data-test-delete-confirmation-modal
        heading={<FormattedMessage id="ui-serials-management.serials.deleteSerial" />}
        id="delete-serial-confirmation"
        message={<FormattedMessage id="ui-serials-management.serials.deleteSerial.confirmMessage" values={{ serial: serial.orderLine?.title ?? serial.id }} />}
        onCancel={() => setShowDeleteConfirmationModal(false)}
        onConfirm={() => {
          handleDelete();
          setShowDeleteConfirmationModal(false);
        }}
        open={showDeleteConfirmationModal}
      />
      <PiecesPreviewModal
        allowCreation
        existingPieceSets={existingPieceSets}
        ruleset={serial?.serialRulesets?.find(
          (sr) => sr?.rulesetStatus?.value === 'active'
        )}
        serialName={serial?.orderLine?.title ?? serial?.id}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </>
  );
};

SerialView.propTypes = propTypes;

export default SerialView;
