import { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useFormState } from 'react-final-form';
import { AppIcon } from '@folio/stripes/core';

import {
  Accordion,
  Button,
  IconButton,
  Pane,
  PaneFooter,
  PaneHeader,
  Paneset,
  PaneMenu,
  expandAllSections,
  collapseAllSections,
  AccordionStatus,
  AccordionSet,
  HasCommand,
  checkScope,
} from '@folio/stripes/components';

import { handleSaveKeyCommand } from '../../utils';

import {
  RulesetInfoForm,
  PatternTimePeriodForm,
  IssuePublicationFieldArray,
  OmissionFieldArray,
  CombinationFieldArray,
} from '../../RulesetFormSections';

import PiecesPreviewModal from '../../PiecesPreviewModal/PiecesPreviewModal';

const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
};

const RulesetForm = ({ handlers: { onClose, onSubmit } }) => {
  const { pristine, submitting, invalid, initialValues, values } =
    useFormState();
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
              buttonStyle="primary mega"
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
    <FormattedMessage id="ui-serials-management.rulesets.editRuleset" />
  ) : (
    <FormattedMessage id="ui-serials-management.rulesets.newRuleset" />
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
            <AccordionSet>
              <Accordion
                label={
                  <FormattedMessage id="ui-serials-management.ruleset.recurrence" />
                }
              >
                <PatternTimePeriodForm />
                {values?.recurrence?.timeUnit &&
                  values?.recurrence?.issues >= 1 && (
                    <IssuePublicationFieldArray />
                )}
              </Accordion>
              <Accordion
                label={
                  <FormattedMessage id="ui-serials-management.ruleset.omissions" />
                }
              >
                <OmissionFieldArray />
              </Accordion>
              <Accordion
                label={
                  <FormattedMessage id="ui-serials-management.ruleset.combinations" />
                }
              >
                <CombinationFieldArray />
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
