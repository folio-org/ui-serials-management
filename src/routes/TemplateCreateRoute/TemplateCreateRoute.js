import { useState, useMemo } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { useMutation } from 'react-query';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { useGenerateNumber } from '@folio/service-interaction';
import { useOkapiKy } from '@folio/stripes/core';

import { MODEL_RULESETS_ENDPOINT } from '../../constants/endpoints';

import { RulesetForm } from '../../components/views';
import {
  getRulesetFormValues,
  urls,
  rulesetSubmitValuesHandler,
} from '../../components/utils';

const TemplateCreateRoute = () => {
  const history = useHistory();
  const location = useLocation();
  const ky = useOkapiKy();
  const { id: serialId } = useParams();

  const [modelRuleset, setModelRuleset] = useState();

  const { generate } = useGenerateNumber({
    callback: (string) => {
      return string;
    },
    generator: 'serialsManagement_patternNumber',
    sequence: 'patternNumber',
  });

  const handleModelRulesetChange = (ms) => {
    setModelRuleset(ms);
  };

  const handleClose = (rulesetId) => {
    history.push(
      `${rulesetId ? urls.rulesetView(serialId, rulesetId) : urls.serialView(serialId)}${location.search}`
    );
  };
  // istanbul ignore next
  const { mutateAsync: postRuleset } = useMutation(
    ['ui-serials-management', 'TemplateCreateRoute', 'postRuleset'],
    (data) => {
      ky.post(MODEL_RULESETS_ENDPOINT, { json: data })
        .json()
        .then((res) => handleClose(res?.id));
    }
  );
  // istanbul ignore next
  const handleSubmitValues = (values, numberGeneratorReturn) => {
    const submitValues = rulesetSubmitValuesHandler(values);
    return {
      ...submitValues,
      owner: { id: serialId },
      rulesetNumber: numberGeneratorReturn?.data?.nextValue,
    };
  };
  // istanbul ignore next
  const submitRuleset = async (values) => {
    const numberGeneratorReturn = await generate();
    const submitValues = handleSubmitValues(values, numberGeneratorReturn);
    await postRuleset(submitValues);
  };

  const initialValues = useMemo(() => {
    return modelRuleset?.serialRuleset
      ? getRulesetFormValues(modelRuleset.serialRuleset)
      : { rulesetStatus: { value: 'active' } };
  }, [modelRuleset]);

  console.log('initialValues', initialValues);
  return (
    <Form
      id="ruleset-create-form"
      initialValues={initialValues}
      keepDirtyOnReinitialize
      mutators={arrayMutators}
      onSubmit={submitRuleset}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <RulesetForm
            handlers={{
              onClose: handleClose,
              onSubmit: handleSubmit,
            }}
            modelRuleset={{
              onChange: handleModelRulesetChange,
              selectedModelRuleset: modelRuleset,
            }}
          />
        </form>
      )}
    </Form>
  );
};

export default TemplateCreateRoute;
