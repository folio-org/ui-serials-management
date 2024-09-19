import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { useMutation, useQuery } from 'react-query';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { LoadingView } from '@folio/stripes/components';
import { useOkapiKy } from '@folio/stripes/core';

import { RULESET_ENDPOINT } from '../../constants/endpoints';

import { RulesetForm } from '../../components/views';
import urls from '../../components/utils/urls';

const RulesetEditRoute = () => {
  const history = useHistory();
  const location = useLocation();
  const ky = useOkapiKy();
  const { id, rid } = useParams();

  const handleClose = () => {
    history.push(`${urls.serialView(id)}${location.search}`);
  };

  const { data: ruleset, isLoading } = useQuery(
    ['ui-serials-management', 'RulesetEditRoute', rid],
    () => ky(RULESET_ENDPOINT(rid)).json()
  );
  // istanbul ignore next
  const { mutateAsync: putRuleset } = useMutation(
    ['ui-serials-management', 'RulesetEditRoute', 'putRuleset'],
    (data) => {
      ky.put(RULESET_ENDPOINT(rid), { json: data })
        .json()
        .then(() => handleClose());
    }
  );
  // istanbul ignore next
  const handleSubmitValues = (values) => {
    const submitValues = {
      ...values,
      owner: { id },
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
    const submitValues = handleSubmitValues(values);
    await putRuleset(submitValues);
  };

  if (isLoading) {
    return <LoadingView dismissible onClose={handleClose} />;
  }

  return (
    <Form
      initialValues={ruleset}
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

export default RulesetEditRoute;
