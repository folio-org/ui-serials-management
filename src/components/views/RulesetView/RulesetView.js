import PropTypes from 'prop-types';

import { AppIcon } from '@folio/stripes/core';
import { Pane, MetaSection } from '@folio/stripes/components';

import {
  ChronologyLabels,
  CombinationRules,
  DisplaySummaryTemplate,
  EnumerationLabels,
  IssuePublication,
  OmissionRules,
  RulesetInfo,
} from '../../RulesetSections';

import { DEFAULT_VIEW_PANE_WIDTH } from '../../../constants/config';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  serial: PropTypes.object,
  ruleset: PropTypes.object,
};

const RulesetView = ({ serial, ruleset, onClose }) => {
  const getSectionProps = (name) => {
    return {
      id: `ruleset-section-${name}`,
      ruleset,
    };
  };

  // istanbul ignore next
  // const shortcuts = [
  //   {
  //     name: 'expandAllSections',
  //     handler: (e) => expandAllSections(e, accordionStatusRef),
  //   },
  //   {
  //     name: 'collapseAllSections',
  //     handler: (e) => collapseAllSections(e, accordionStatusRef),
  //   },
  // ];

  return (
    <>
      {/* <HasCommand
        // commands={shortcuts}
        isWithinScope={checkScope}
        scope={document.body}
      > */}
      <Pane
        appIcon={
          <AppIcon app="serials-management" iconKey="app" size="small" />
        }
        defaultWidth={DEFAULT_VIEW_PANE_WIDTH}
        dismissible
        onClose={onClose}
      >
        <MetaSection
          contentId="rulesetMetaContent"
          createdDate={ruleset?.dateCreated}
          hideSource
          lastUpdatedDate={ruleset?.lastUpdated}
        />
        <RulesetInfo serial={serial} {...getSectionProps('ruleset-info')} />
        <IssuePublication {...getSectionProps('issue-publication')} />
        {!!ruleset?.omission?.rules?.length && (
          <OmissionRules {...getSectionProps('omission-rules')} />
        )}
        {!!ruleset?.combination?.rules?.length && (
          <CombinationRules {...getSectionProps('combination-rules')} />
        )}
        {/* When chrnology and enumeration are seperated out, this conditional will need to be changed */}
        {ruleset?.templateConfig?.rules?.some(
          (e) => e?.templateMetadataRuleType?.value === 'chronology'
        ) && <ChronologyLabels {...getSectionProps('chronology-labels')} />}
        {ruleset?.templateConfig?.rules?.some(
          (e) => e?.templateMetadataRuleType?.value === 'enumeration'
        ) && <EnumerationLabels {...getSectionProps('enumeration-labels')} />}
        <DisplaySummaryTemplate
          {...getSectionProps('display-template-summary')}
        />
      </Pane>
      {/* </HasCommand> */}
    </>
  );
};

RulesetView.propTypes = propTypes;

export default RulesetView;
