import { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useFormState, useForm } from 'react-final-form';
import { useParams } from 'react-router-dom';
import isEqual from 'lodash/isEqual';

import { AppIcon } from '@folio/stripes/core';

import {
  Accordion,
  AccordionSet,
  AccordionStatus,
  Button,
  Col,
  ExpandAllButton,
  HasCommand,
  IconButton,
  Pane,
  PaneFooter,
  PaneHeader,
  Paneset,
  PaneMenu,
  Row,
  expandAllSections,
  collapseAllSections,
  checkScope,
} from '@folio/stripes/components';

import {
  REPLACE_AND_DELETE,
  REPLACE_AND_DEPRECATE,
} from '../../../constants/replaceTypes';
import { getRulesetFormValues, handleSaveKeyCommand } from '../../utils';

import {
  RulesetInfoForm,
  ModelRulesetSelection,
  PatternTimePeriodForm,
  IssuePublicationFieldArray,
  OmissionFieldArray,
  CombinationFieldArray,
  ChronologyFieldArray,
  EnumerationFieldArray,
  TemplateStringField,
} from '../../RulesetFormSections';

import PiecesPreviewModal from '../../PiecesPreviewModal';

const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
  }).isRequired,
  modelRuleset: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    selectedModelRuleset: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      serialRuleset: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  }).isRequired,
};

const RulesetForm = ({
  handlers: { onClose, onSubmit },
  modelRuleset: { onChange, selectedModelRuleset },
}) => {
  const params = useParams();
  const { pristine, submitting, invalid, values } = useFormState();
  const { getFieldState } = useForm();
  const [showModal, setShowModal] = useState(false);
  const accordionStatusRef = createRef();

  const modelRulesetPresent = isEqual(
    values,
    getRulesetFormValues(selectedModelRuleset?.serialRuleset)
  );

  // istanbul ignore next
  const shortcuts = [
    {
      name: 'save',
      handler: (e) => handleSaveKeyCommand(e, onSubmit, pristine, submitting),
    },
    {
      name: 'expandAllSections',
      handler: (e) => expandAllSections(e, accordionStatusRef),
    },
    {
      name: 'collapseAllSections',
      handler: (e) => collapseAllSections(e, accordionStatusRef),
    },
  ];

  const renderPaneTitle = () => {
    switch (params?.replaceType) {
      case REPLACE_AND_DEPRECATE:
        return (
          <FormattedMessage id="ui-serials-management.ruleset.copyAndDeprecatePublicationPattern" />
        );
      case REPLACE_AND_DELETE:
        return (
          <FormattedMessage id="ui-serials-management.ruleset.editPublicationPattern" />
        );
      default:
        return (
          <FormattedMessage id="ui-serials-management.rulesets.newPublicationPattern" />
        );
    }
  };

  const renderPaneFooter = () => {
    return (
      <PaneFooter
        renderEnd={
          <>
            <Button
              buttonStyle="default mega"
              // Bit funky but a confirmed way of ensuring that incomplete recurrence objects arent passed
              // disabled={pristine || invalid || submitting}
              disabled={
                (!modelRulesetPresent && pristine) || invalid || submitting
              }
              marginBottom0
              onClick={() => setShowModal(!showModal)}
            >
              <FormattedMessage id="ui-serials-management.ruleset.preview" />
            </Button>
            <Button
              buttonStyle="primary mega"
              // disabled={pristine || submitting}
              disabled={(!modelRulesetPresent && pristine) || submitting}
              marginBottom0
              onClick={onSubmit}
              type="submit"
            >
              <FormattedMessage id="stripes-components.saveAndClose" />
            </Button>
          </>
        }
        renderStart={
          <Button
            buttonStyle="default mega"
            marginBottom0
            onClick={() => onClose()}
          >
            <FormattedMessage id="stripes-components.cancel" />
          </Button>
        }
      />
    );
  };

  const renderFirstMenu = () => {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-serials-management.closeForm">
          {([ariaLabel]) => (
            <IconButton
              aria-label={ariaLabel}
              icon="times"
              id="close-ruleset-form-button"
              onClick={() => onClose()}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  };

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <Paneset>
        <Pane
          appIcon={<AppIcon app="serials-management" />}
          centerContent
          defaultWidth="100%"
          firstMenu={renderFirstMenu()}
          footer={renderPaneFooter()}
          renderHeader={(renderProps) => (
            <PaneHeader {...renderProps} paneTitle={renderPaneTitle()} />
          )}
        >
          <RulesetInfoForm />
          <ModelRulesetSelection
            onChange={onChange}
            selectedModelRuleset={selectedModelRuleset}
          />
          <AccordionStatus ref={accordionStatusRef}>
            <Row end="xs">
              <Col xs>
                <ExpandAllButton />
              </Col>
            </Row>
            <AccordionSet>
              <Accordion
                label={
                  <FormattedMessage id="ui-serials-management.ruleset.publicationCycle" />
                }
              >
                <PatternTimePeriodForm />
                {values?.recurrence?.timeUnit &&
                  values?.recurrence?.issues >= 1 &&
                  getFieldState('recurrence.issues')?.valid && (
                    <IssuePublicationFieldArray />
                  )}
              </Accordion>
              <Accordion
                label={
                  <FormattedMessage id="ui-serials-management.ruleset.omissionRules" />
                }
              >
                <OmissionFieldArray />
              </Accordion>
              <Accordion
                label={
                  <FormattedMessage id="ui-serials-management.ruleset.combinationRules" />
                }
              >
                <CombinationFieldArray />
              </Accordion>
              <Accordion
                label={
                  <FormattedMessage id="ui-serials-management.ruleset.chronologyLabels" />
                }
              >
                <ChronologyFieldArray />
              </Accordion>
              <Accordion
                label={
                  <FormattedMessage id="ui-serials-management.ruleset.enumerationLabels" />
                }
              >
                <EnumerationFieldArray />
              </Accordion>
            </AccordionSet>
          </AccordionStatus>
          <TemplateStringField />
        </Pane>
        <PiecesPreviewModal
          ruleset={values}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      </Paneset>
    </HasCommand>
  );
};

RulesetForm.propTypes = propTypes;

export default RulesetForm;
