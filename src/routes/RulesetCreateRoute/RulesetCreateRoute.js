import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { useMutation } from 'react-query';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { useGenerateNumber } from '@folio/service-interaction';
import { useOkapiKy } from '@folio/stripes/core';

import { RULESETS_ENDPOINT } from '../../constants/endpoints';

import { RulesetForm } from '../../components/views';
import urls from '../../components/utils/urls';

const RulesetCreateRoute = () => {
  const history = useHistory();
  const location = useLocation();
  const ky = useOkapiKy();
  const { id } = useParams();

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
    const submitValues = {
      ...values,
      owner: { id },
      rulesetNumber: numberGeneratorReturn?.data?.nextValue,
      recurrence: {
        ...values?.recurrence,
        rules: values?.recurrence?.rules?.map((e) => {
          // If no ordinal specified, assume ordinal is 1 for all rules
          if (!e?.ordinal) {
            e.ordinal = 1;
          }
          // If no pattern fields are supplied (in the case of the day time unit)
          // Add anempty pattern object to all rules
          if (!e?.pattern) {
            e.pattern = {};
          }
          e.patternType = values?.patternType;
          return e;
        }),
      },
      templateConfig: {
        ...values?.templateConfig,
        rules: values?.templateConfig?.rules?.map((rule, ruleIndex) => {
          rule.index = ruleIndex;
          rule?.ruleType?.ruleFormat?.levels?.forEach((level, levelIndex) => {
            level.index = levelIndex;
            return level;
          });
          return rule;
        }),
      },
    };
    return submitValues;
  };
  // istanbul ignore next
  const submitRuleset = async (values) => {
    const numberGeneratorReturn = await generate();
    const submitValues = handleSubmitValues(values, numberGeneratorReturn);
    await postRuleset(submitValues);
  };

  return (
    <Form
      initialValues={{
        rulesetStatus: { value: 'active' },
      }}
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
          />
        </form>
      )}
    </Form>
  );
};

export default RulesetCreateRoute;
