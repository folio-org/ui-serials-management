import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useFormState } from 'react-final-form';

import {
  Accordion,
} from '@folio/stripes/components';

import {
  ModelRulesetInfoForm,
  RulesetInfoForm,
} from '../../RulesetFormSections';

import RulesetFormLayout, { RulesetSections } from './RulesetFormLayout';

const propTypes = {
  isEdit: PropTypes.bool,
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
  }).isRequired,
  isCopy: PropTypes.bool,
};

const TemplateForm = ({
  handlers: { onClose, onSubmit },
  isEdit = false,
  isCopy = false
}) => {
  const nameInputRef = useRef(null);
  const { initialValues } = useFormState();
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

  const getPreviewDisabled = ({ pristine, invalid, submitting }) => (!isCopy && pristine) || invalid || submitting;

  const getSaveDisabled = ({ pristine, submitting }) => ((!isCopy || isEdit) && pristine) || submitting;

  return (
    <RulesetFormLayout
      closeButtonId="close-template-form-button"
      getPreviewDisabled={getPreviewDisabled}
      getSaveDisabled={getSaveDisabled}
      infoSection={infoSection}
      onClose={onClose}
      onSubmit={onSubmit}
      renderAccordions={renderAccordions}
      title={isEdit ?
        <FormattedMessage id="ui-serials-management.templates.editTemplate" values={{ name: initialValues?.name }} />
        :
        <FormattedMessage id="ui-serials-management.templates.newTemplate" />
      }
    />
  );
};

TemplateForm.propTypes = propTypes;

export default TemplateForm;
