// TemplateForm.js

import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
} from '@folio/stripes/components';

import {
  ModelRulesetInfoForm,
  RulesetInfoForm,
} from '../../RulesetFormSections';

import RulesetFormLayout, { RulesetSections } from '../RulesetForm/RulesetFormLayout';

const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
  }).isRequired,
};

const TemplateForm = ({
  handlers: { onClose, onSubmit },
}) => {
  const nameInputRef = useRef(null);

  useEffect(() => {
    const id = setTimeout(() => {
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    }, 0);

    return () => clearTimeout(id);
  }, []);

  const infoSection = (
    <ModelRulesetInfoForm nameInputRef={nameInputRef} />
  );

  const renderAccordions = ({ values, getFieldState }) => (
    <>
      <Accordion
        label={
          <FormattedMessage id="ui-serials-management.templates.rulesetInfo" />
        }
      >
        <RulesetInfoForm />
      </Accordion>
      <RulesetSections
        getFieldState={getFieldState}
        values={values}
      />
    </>
  );

  const getPreviewDisabled = ({ pristine, invalid, submitting }) => pristine || invalid || submitting;

  const getSaveDisabled = ({ pristine, submitting }) => pristine || submitting;

  return (
    <RulesetFormLayout
      closeButtonId="close-template-form-button"
      getPreviewDisabled={getPreviewDisabled}
      getSaveDisabled={getSaveDisabled}
      infoSection={infoSection}
      onClose={onClose}
      onSubmit={onSubmit}
      renderAccordions={renderAccordions}
      title={
        <FormattedMessage id="ui-serials-management.templates.newTemplate" />
      }
    />
  );
};

TemplateForm.propTypes = propTypes;

export default TemplateForm;
