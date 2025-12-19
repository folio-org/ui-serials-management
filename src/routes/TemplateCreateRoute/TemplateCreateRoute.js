import { useMemo } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { useMutation } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';

import { useOkapiKy } from '@folio/stripes/core';

import { MODEL_RULESETS_ENDPOINT } from '../../constants/endpoints';

import { TemplateForm } from '../../components/views';
import {
  getRulesetFormValues,
  rulesetSubmitValuesHandler,
  urls,
} from '../../components/utils';

const TemplateCreateRoute = () => {
  const history = useHistory();
  const location = useLocation();
  const ky = useOkapiKy();

  const copyFrom = location.state?.copyFrom;

  const initialValues = useMemo(() => {
    const base = { rulesetStatus: { value: 'active' } };

    if (!copyFrom) return base;

    const rulesetValues = copyFrom.serialRuleset
      ? getRulesetFormValues(copyFrom.serialRuleset)
      : {};

    return {
      ...base,
      ...rulesetValues,
      name: copyFrom.name ? `Copy of: ${copyFrom.name}` : '',
      modelRulesetDescription: copyFrom.description ?? '',
      exampleLabel: copyFrom.exampleLabel ?? '',
    };
  }, [copyFrom]);

  const handleClose = (templateId) => {
    history.push(
      `${templateId ? urls.templateView(templateId) : urls.templates()}${location.search}`
    );
  };

  // istanbul ignore next
  const { mutateAsync: postTemplate } = useMutation(
    ['ui-serials-management', 'TemplateCreateRoute', 'postTemplate'],
    (data) => {
      ky.post(MODEL_RULESETS_ENDPOINT, { json: data })
        .json()
        .then((res) => handleClose(res?.id));
    }
  );

  const handleSubmitValues = (values) => {
    const {
      name,
      modelRulesetDescription,
      exampleLabel,
      ...rulesetFormValues
    } = values;

    const serialRuleset = rulesetSubmitValuesHandler(rulesetFormValues);

    return {
      name,
      description: modelRulesetDescription,
      exampleLabel,
      modelRulesetStatus: { value: 'active' },
      serialRuleset,
    };
  };

  // istanbul ignore next
  const submitTemplate = async (values) => {
    const submitValues = handleSubmitValues(values);
    await postTemplate(submitValues);
  };

  return (
    <Form
      id="template-create-form"
      initialValues={initialValues}
      keepDirtyOnReinitialize
      mutators={arrayMutators}
      onSubmit={submitTemplate}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <TemplateForm
            handlers={{
              onClose: handleClose,
              onSubmit: handleSubmit,
            }}
            isCopy={!!copyFrom}
          />
        </form>
      )}
    </Form>
  );
};

export default TemplateCreateRoute;
