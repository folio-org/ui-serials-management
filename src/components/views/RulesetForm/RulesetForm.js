import { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useFormState, useForm } from 'react-final-form';
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

import { handleSaveKeyCommand } from '../../utils';

import {
  RulesetInfoForm,
  PatternTimePeriodForm,
  IssuePublicationFieldArray,
  OmissionFieldArray,
  CombinationFieldArray,
  LabelFieldArray,
} from '../../RulesetFormSections';

import PiecesPreviewModal from '../../PiecesPreviewModal';

const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
};

const RulesetForm = ({ handlers: { onClose, onSubmit } }) => {
  const { pristine, submitting, invalid, initialValues, values } =
    useFormState();
  const { getFieldState } = useForm();
  const [showModal, setShowModal] = useState(false);
  const accordionStatusRef = createRef();

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

  const renderPaneFooter = () => {
    return (
      <PaneFooter
        renderEnd={
          <>
            <Button
              buttonStyle="default mega"
              // Bit funky but a confirmed way of ensuring that incomplete recurrence objects arent passed
              disabled={pristine || invalid || submitting}
              marginBottom0
              onClick={() => setShowModal(!showModal)}
            >
              <FormattedMessage id="ui-serials-management.ruleset.preview" />
            </Button>
            <Button
              buttonStyle="primary mega"
              disabled={pristine || submitting}
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

  const renderPaneTitle = () => (initialValues?.id ? (
    <FormattedMessage id="ui-serials-management.rulesets.editPublicationPattern" />
  ) : (
    <FormattedMessage id="ui-serials-management.rulesets.newPublicationPattern" />
  ));

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
                  <FormattedMessage id="ui-serials-management.ruleset.labelling" />
                }
              >
                <LabelFieldArray />
              </Accordion>
            </AccordionSet>
          </AccordionStatus>
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
