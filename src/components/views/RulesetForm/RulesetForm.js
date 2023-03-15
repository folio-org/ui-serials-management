import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { useFormState } from 'react-final-form';
import { AppIcon } from '@folio/stripes/core';

import {
  Button,
  IconButton,
  Pane,
  PaneFooter,
  PaneHeader,
  Paneset,
  PaneMenu,
} from '@folio/stripes/components';

import {
  PatternTimePeriodForm,
  IssuePublicationFieldArray,
} from '../../RulesetFormSections';

const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
};

const RulesetForm = ({ handlers: { onClose, onSubmit } }) => {
  const { pristine, submitting, initialValues, values } = useFormState();

  const renderPaneFooter = () => {
    return (
      <PaneFooter
        renderEnd={
          <Button
            buttonStyle="primary mega"
            disabled={pristine || submitting}
            marginBottom0
            onClick={onSubmit}
            type="submit"
          >
            <FormattedMessage id="stripes-components.saveAndClose" />
          </Button>
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
        <PatternTimePeriodForm />
        {values?.recurrence?.timeUnit && values?.recurrence?.issues >= 1 && (
          <IssuePublicationFieldArray />
        )}
      </Pane>
    </Paneset>
  );
};

RulesetForm.propTypes = propTypes;

export default RulesetForm;
