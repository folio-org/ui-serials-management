import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { useMutation } from 'react-query';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { useGenerateNumber } from '@folio/service-interaction';
import { useOkapiKy } from '@folio/stripes/core';

import { RULESETS_ENDPOINT } from '../../constants/endpoints';

import { RulesetForm } from '../../components/views';
import { getRulesetFormValues, urls, rulesetSubmitValuesHandler } from '../../components/utils';

import { useModelRuleset } from '../../hooks';

const RulesetCreateRoute = () => {
  const history = useHistory();
  const location = useLocation();
  const ky = useOkapiKy();
  const { id } = useParams();

  const { selectedModelRuleset, handleSelectModelRuleset } = useModelRuleset();

  const { generate } = useGenerateNumber({
    callback: (string) => {
      return string;
    },
    generator: 'serialsManagement_patternNumber',
    sequence: 'patternNumber',
  });

  const handleClose = () => {
    history.push(`${urls.serialView(id)}${location.search}`);
  };
  // istanbul ignore next
  const { mutateAsync: postRuleset } = useMutation(
    ['ui-serials-management', 'RulesetCreateRoute', 'postRuleset'],
    (data) => {
      ky.post(RULESETS_ENDPOINT, { json: data })
        .json()
        .then(() => handleClose());
    }
  );
  // istanbul ignore next
  const handleSubmitValues = (values, numberGeneratorReturn) => {
    const submitValues = rulesetSubmitValuesHandler(values);
    return {
      ...submitValues,
      owner: { id },
      rulesetNumber: numberGeneratorReturn?.data?.nextValue,
    };
  };
  // istanbul ignore next
  const submitRuleset = async (values) => {
    const numberGeneratorReturn = await generate();
    const submitValues = handleSubmitValues(values, numberGeneratorReturn);
    await postRuleset(submitValues);
  };

  const initialValues = selectedModelRuleset?.serialRuleset
    ? getRulesetFormValues(selectedModelRuleset.serialRuleset)
    : { rulesetStatus: { value: 'active' } };

  return (
    <Form
      // enableReinitialize
      // keepDirtyOnReinitialize
      initialValues={initialValues}
      keepDirtyOnReinitialize={false}
      mutators={arrayMutators}
      onSubmit={submitRuleset}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <RulesetForm
            handlers={{
              onClose: handleClose,
              onSubmit: handleSubmit,
              onSelect: handleSelectModelRuleset
            }}
            selectedModelRuleset={selectedModelRuleset}
          />
        </form>
      )}
    </Form>
  );
};

export default RulesetCreateRoute;
