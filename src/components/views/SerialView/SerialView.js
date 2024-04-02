import { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { AppIcon, useOkapiKy, useStripes } from '@folio/stripes/core';
import {
  Pane,
  LoadingPane,
  Button,
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
  ActivePublicationPattern,
  DeprecatedPublicationPatterns,
  SerialInfo,
  SerialPOLine,
  SerialPieceSets,
} from '../../SerialSections';
import PiecesPreviewModal from '../../PiecesPreviewModal';
import { urls } from '../../utils';
import { DEFAULT_VIEW_PANE_WIDTH } from '../../../constants/config';
import { PIECE_SETS_ENDPOINT } from '../../../constants/endpoints';

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

  const [showModal, setShowModal] = useState(false);

  const { data: pieceSets, pieceSetsLoading } = useQuery(
    ['ui-serials-management', 'SerialView', serial?.id],
    () => ky
      .get(`${PIECE_SETS_ENDPOINT}?filters=ruleset.owner.id==${serial?.id}`)
      .json()
  );

  const handleEdit = () => {
    history.push(`${urls.serialEdit(params?.id)}${location.search}`);
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

  const renderActionMenu = () => {
    const buttons = [];
    if (stripes.hasPerm('serials-management.serials.edit')) {
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
      if (stripes.hasPerm('serials-management.predictedPieces.edit')) {
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
              <ActivePublicationPattern
                {...getSectionProps('active-publication-pattern')}
              />
              {!!serial?.serialRulesets?.find(
                (sr) => sr?.rulesetStatus?.value === 'deprecated'
              ) && (
                <DeprecatedPublicationPatterns
                  {...getSectionProps('deprecated-publication-pattern')}
                />
              )}
              {!!pieceSets?.length && !pieceSetsLoading && (
                <SerialPieceSets
                  id="serial-section-serial-piece-sets"
                  pieceSets={pieceSets}
                />
              )}
            </AccordionSet>
          </AccordionStatus>
        </Pane>
      </HasCommand>
      <PiecesPreviewModal
        allowCreation
        ruleset={serial?.serialRulesets?.find(
          (sr) => sr?.rulesetStatus?.value === 'active'
        )}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </>
  );
};

SerialView.propTypes = propTypes;

export default SerialView;
