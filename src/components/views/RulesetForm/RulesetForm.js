import { useState } from 'react';
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
} from '@folio/stripes/components';

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
  const { pristine, submitting, invalid, initialValues, values } = useFormState();
  const [showModal, setShowModal] = useState(false);

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
        <Accordion
          label={
            <FormattedMessage id="ui-serials-management.ruleset.recurrence" />
          }
        >
          <PatternTimePeriodForm />
          {values?.recurrence?.timeUnit && values?.recurrence?.issues >= 1 && (
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
      </Pane>
      <PiecesPreviewModal
        ruleset={values}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </Paneset>
  );
};

RulesetForm.propTypes = propTypes;

export default RulesetForm;
