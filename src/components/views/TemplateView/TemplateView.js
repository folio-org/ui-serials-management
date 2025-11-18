import { createRef } from 'react';
import PropTypes from 'prop-types';

import { AppIcon } from '@folio/stripes/core';
import {
  AccordionSet,
  AccordionStatus,
  Col,
  ExpandAllButton,
  HasCommand,
  LoadingPane,
  MetaSection,
  Pane,
  Row,
  checkScope,
  collapseAllSections,
  expandAllSections,
} from '@folio/stripes/components';

import TemplateInfo from '../../TemplateInfo';
import {
  ChronologyLabels,
  CombinationRules,
  DisplaySummaryTemplate,
  EnumerationLabels,
  IssuePublication,
  OmissionRules,
} from '../../RulesetSections';

import { DEFAULT_VIEW_PANE_WIDTH } from '../../../constants/config';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  queryProps: PropTypes.object,
  resource: PropTypes.object,
};

const TemplateView = ({ resource, queryProps, onClose }) => {
  const accordionStatusRef = createRef();
  const { isLoading } = queryProps || {};
  console.log('TemplateView resource %o', resource);

  const getSectionProps = (name) => {
    return {
      id: `template-section-${name}`,
      ruleset: resource?.serialRuleset,
    };
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
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <Pane
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
        <TemplateInfo template={resource} {...getSectionProps('template-info')} />
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
  );
};


TemplateView.propTypes = propTypes;

export default TemplateView;
