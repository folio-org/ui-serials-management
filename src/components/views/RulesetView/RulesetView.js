import { createRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';

import { AppIcon, useStripes } from '@folio/stripes/core';
import {
  Button,
  HasCommand,
  Icon,
  MetaSection,
  Pane,
  checkScope,
  collapseAllSections,
  expandAllSections,
} from '@folio/stripes/components';

import {
  ChronologyLabels,
  CombinationRules,
  DisplaySummaryTemplate,
  EnumerationLabels,
  IssuePublication,
  OmissionRules,
  RulesetInfo,
} from '../../RulesetSections';

import {
  REPLACE_AND_DELETE,
  REPLACE_AND_DEPRECATE,
} from '../../../constants/replaceTypes';
import { DEFAULT_VIEW_PANE_WIDTH } from '../../../constants/config';

import { urls } from '../../utils';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  serial: PropTypes.object,
  ruleset: PropTypes.object,
  pieceSets: PropTypes.arrayOf(PropTypes.object),
};

const RulesetView = ({ serial, ruleset, pieceSets, onClose }) => {
  const history = useHistory();
  const location = useLocation();
  const stripes = useStripes();
  const accordionStatusRef = createRef();

  const getSectionProps = (name) => {
    return {
      id: `ruleset-section-${name}`,
      ruleset,
    };
  };

  const handleReplaceAndDeprecate = () => {
    history.push(
      `${urls.rulesetReplace(serial?.id, ruleset?.id, REPLACE_AND_DEPRECATE)}${location.search}`
    );
  };

  const handleReplaceAndDelete = () => {
    history.push(
      `${urls.rulesetReplace(serial?.id, ruleset?.id, REPLACE_AND_DELETE)}${location.search}`
    );
  };

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

  const renderActionMenu = () => {
    const buttons = [];
    if (stripes.hasPerm('ui-serials-management.rulesets.edit')) {
      buttons.push(
        <Button
          key="edit-ruleset-option"
          buttonStyle="dropdownItem"
          disabled={pieceSets?.length >= 1}
          id="clickable-dropdown-edit-ruleset"
          onClick={() => handleReplaceAndDelete()}
        >
          <Icon icon="edit">
            <FormattedMessage id="ui-serials-management.edit" />
          </Icon>
        </Button>
      );
    }
    if (stripes.hasPerm('ui-serials-management.rulesets.edit')) {
      buttons.push(
        <Button
          key="copy-and-deprecate-ruleset-option"
          buttonStyle="dropdownItem"
          id="clickable-dropdown-copy-and-deprecate-ruleset"
          onClick={() => handleReplaceAndDeprecate()}
        >
          <Icon icon="edit">
            <FormattedMessage id="ui-serials-management.ruleset.copyAndDeprecate" />
          </Icon>
        </Button>
      );
    }
    return buttons.length ? buttons : null;
  };

  return (
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
      >
        <MetaSection
          contentId="rulesetMetaContent"
          createdDate={ruleset?.dateCreated}
          hideSource
          lastUpdatedDate={ruleset?.lastUpdated}
        />
        <RulesetInfo serial={serial} {...getSectionProps('ruleset-info')} />
        <IssuePublication {...getSectionProps('issue-publication')} />
        {ruleset?.omission?.rules?.length > 0 && (
          <OmissionRules {...getSectionProps('omission-rules')} />
        )}
        {ruleset?.combination?.rules?.length > 0 && (
          <CombinationRules {...getSectionProps('combination-rules')} />
        )}
        {ruleset?.templateConfig?.chronologyRules?.length > 0 && (
          <ChronologyLabels {...getSectionProps('chronology-labels')} />
        )}
        {ruleset?.templateConfig?.enumerationRules?.length > 0 && (
          <EnumerationLabels {...getSectionProps('enumeration-labels')} />
        )}
        <DisplaySummaryTemplate
          {...getSectionProps('display-template-summary')}
        />
      </Pane>
    </HasCommand>
  );
};

RulesetView.propTypes = propTypes;

export default RulesetView;
