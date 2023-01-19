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
  Accordion,
} from '@folio/stripes/components';

import {
  POLineForm,
  SerialInfoForm,
  SerialNoteFieldArray,
} from '../../SerialFormSections';

const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
};

const SerialForm = ({ handlers: { onClose, onSubmit } }) => {
  const { pristine, submitting, initialValues } = useFormState();

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

  const renderPaneTitle = () => (initialValues ? (
    <FormattedMessage id="ui-serials-management.serials.editSerial" />
  ) : (
    <FormattedMessage id="ui-serials-management.serials.newSerial" />
  ));

  const renderFirstMenu = () => {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-serials-management.closeForm">
          {([ariaLabel]) => (
            <IconButton
              aria-label={ariaLabel}
              icon="times"
              id="close-serial-form-button"
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
        <POLineForm />
        <SerialInfoForm />
        <Accordion
          label={
            <FormattedMessage id="ui-serials-management.serials.notes" />
          }
        >
          <SerialNoteFieldArray />
        </Accordion>
      </Pane>
    </Paneset>
  );
};

SerialForm.propTypes = propTypes;

export default SerialForm;
