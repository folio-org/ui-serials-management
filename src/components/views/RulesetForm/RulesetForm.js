import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import isEqual from 'lodash/isEqual';

import {
  REPLACE_AND_DELETE,
  REPLACE_AND_DEPRECATE,
} from '../../../constants/replaceTypes';
import { getRulesetFormValues } from '../../utils';

import {
  RulesetInfoForm,
  ModelRulesetSelection,
} from '../../RulesetFormSections';

import RulesetFormLayout, { RulesetSections } from './RulesetFormLayout';

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

  const renderTitle = () => {
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

  const infoSection = (
    <>
      <RulesetInfoForm />
      <ModelRulesetSelection
        onChange={onChange}
        selectedModelRuleset={selectedModelRuleset}
      />
    </>
  );

  const renderAccordions = ({ values, getFieldState }) => (
    <RulesetSections
      getFieldState={getFieldState}
      values={values}
    />
  );

  const computeModelRulesetPresent = (values) => isEqual(
    values,
    getRulesetFormValues(selectedModelRuleset?.serialRuleset)
  );

  const getPreviewDisabled = ({ pristine, invalid, submitting, values }) => {
    const modelRulesetPresent = computeModelRulesetPresent(values);
    // Bit funky but a confirmed way of ensuring that incomplete recurrence objects arent passed
    return (!modelRulesetPresent && pristine) || invalid || submitting;
  };

  const getSaveDisabled = ({ pristine, submitting, values }) => {
    const modelRulesetPresent = computeModelRulesetPresent(values);
    return (!modelRulesetPresent && pristine) || submitting;
  };

  return (
    <RulesetFormLayout
      closeButtonId="close-ruleset-form-button"
      getPreviewDisabled={getPreviewDisabled}
      getSaveDisabled={getSaveDisabled}
      infoSection={infoSection}
      onClose={onClose}
      onSubmit={onSubmit}
      renderAccordions={renderAccordions}
      title={renderTitle()}
    />
  );
};

RulesetForm.propTypes = propTypes;

export default RulesetForm;
