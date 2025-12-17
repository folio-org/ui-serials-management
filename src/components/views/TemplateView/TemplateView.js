import { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';

import {
  AppIcon,
  useCallout,
  useOkapiKy,
  useStripes
} from '@folio/stripes/core';

import {
  AccordionSet,
  AccordionStatus,
  Button,
  Col,
  ConfirmationModal,
  ExpandAllButton,
  HasCommand,
  Icon,
  LoadingPane,
  MetaSection,
  Pane,
  Row,
  checkScope,
  collapseAllSections,
  expandAllSections
} from '@folio/stripes/components';

import TemplateInfo from '../../TemplateInfo';
import {
  ChronologyLabels,
  CombinationRules,
  DisplaySummaryTemplate,
  EnumerationLabels,
  IssuePublication,
  OmissionRules,
  PublicationCycleInfo
} from '../../RulesetSections';

import { urls } from '../../utils';
import { DEFAULT_VIEW_PANE_WIDTH } from '../../../constants/config';
import { MODEL_RULESET_ENDPOINT } from '../../../constants/endpoints';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  queryProps: PropTypes.object,
  resource: PropTypes.object,
};

const TemplateView = ({ resource, queryProps, onClose }) => {
  const accordionStatusRef = createRef();
  const stripes = useStripes();
  const ky = useOkapiKy();
  const queryClient = useQueryClient();
  const callout = useCallout();
  const history = useHistory();
  const location = useLocation();
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

  const { isLoading } = queryProps || {};
  const templatePath = MODEL_RULESET_ENDPOINT(resource?.id);

  const getSectionProps = (name) => {
    return {
      id: `template-section-${name}`,
      ruleset: resource?.serialRuleset,
    };
  };

  const { mutateAsync: deleteTemplate } = useMutation(
    [templatePath, 'ui-serials-management', 'TemplateView', 'deleteTemplate'],
    () => ky
      .delete(templatePath)
      .then(() => queryClient.invalidateQueries({ queryKey: ['@folio/serials-management', 'SASQ', 'templates', 'viewAll'] }))
      .then(() => {
        history.push(`${urls.templates()}${location.search}`);
        callout.sendCallout({
          message: (
            <FormattedMessage
              id="ui-serials-management.templates.deleteTemplate.success"
              values={{ name: resource?.name ?? resource?.id }}
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
              id="ui-serials-management.templates.deleteTemplate.error"
              values={{ message: error?.message }}
            />
          ),
        });
        throw error;
      })
  );

  const renderActionMenu = ({ onToggle }) => {
    const buttons = [];

    if (stripes.hasPerm('ui-serials-management.modelrulesets.manage')) {
      buttons.push(
        <Button
          key="delete-template"
          buttonStyle="dropdownItem"
          id="clickable-dropdown-delete-template"
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

  const shortcuts = [
    {
      name: 'expandAllSections',
      handler: (e) => expandAllSections(e, accordionStatusRef),
    },
    {
      name: 'collapseAllSections',
      handler: (e) => collapseAllSections(e, accordionStatusRef),
    },
  ];

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
          paneTitle={resource.name}
        >
          <MetaSection
            contentId="templateMetaContent"
            createdDate={resource.dateCreated}
            hideSource
            lastUpdatedDate={resource.lastUpdated}
          />
          <TemplateInfo template={resource} />
          <PublicationCycleInfo {...getSectionProps('publication-cycle-info')} />
          <AccordionStatus ref={accordionStatusRef}>
            <Row end="xs">
              <Col xs>
                <ExpandAllButton />
              </Col>
            </Row>
            <AccordionSet>
              <IssuePublication {...getSectionProps('issue-publication')} />
              {resource.serialRuleset?.omission?.rules?.length > 0 && (
                <OmissionRules {...getSectionProps('omission-rules')} />
              )}
              {resource.serialRuleset?.combination?.rules?.length > 0 && (
                <CombinationRules {...getSectionProps('combination-rules')} />
              )}
              {resource.serialRuleset?.templateConfig?.chronologyRules?.length > 0 && (
                <ChronologyLabels {...getSectionProps('chronology-labels')} />
              )}
              {resource.serialRuleset?.templateConfig?.enumerationRules?.length > 0 && (
                <EnumerationLabels {...getSectionProps('enumeration-labels')} />
              )}
              <DisplaySummaryTemplate
                {...getSectionProps('display-template-summary')}
              />
            </AccordionSet>
          </AccordionStatus>
        </Pane>
      </HasCommand>
      <ConfirmationModal
        buttonStyle="danger"
        confirmLabel={<FormattedMessage id="ui-serials-management.delete" />}
        data-test-delete-confirmation-modal
        heading={<FormattedMessage id="ui-serials-management.templates.deleteTemplate" />}
        id="delete-template-confirmation"
        message={<FormattedMessage id="ui-serials-management.templates.deleteTemplate.confirmMessage" values={{ name: resource?.name }} />}
        onCancel={() => setShowDeleteConfirmationModal(false)}
        onConfirm={() => {
          deleteTemplate();
          setShowDeleteConfirmationModal(false);
        }}
        open={showDeleteConfirmationModal}
      />
    </>
  );
};


TemplateView.propTypes = propTypes;

export default TemplateView;
