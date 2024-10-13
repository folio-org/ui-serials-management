import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { useMutation, useQuery } from 'react-query';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { LoadingView } from '@folio/stripes/components';
import { useOkapiKy } from '@folio/stripes/core';

import { RULESET_ENDPOINT } from '../../constants/endpoints';

import { RulesetForm } from '../../components/views';
import { urls, deepDeleteKeys } from '../../components/utils';

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

  // TODO Currently replace and deprecate is hard coded, should be replaced
  // istanbul ignore next
  const { mutateAsync: putRuleset } = useMutation(
    ['ui-serials-management', 'RulesetEditRoute', 'putRuleset'],
    (data) => {
      ky.post(`serials-management/rulesets/${rid}/replaceAndDeprecate`, {
        json: data,
      })
        .json()
        .then(() => handleClose());
    }
  );

  // istanbul ignore next
  const handleSubmitValues = (values) => {
    const submitValues = {
      ...values,
      owner: { id },
      rulesetNumber: ruleset?.rulesetNumber,
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

  const getInitialValues = () => {
    // Used to format saved ruleset values into workable form values
    const initialValues = {
      ...ruleset,
      recurrence: ruleset?.recurrence,
      patternType: ruleset?.recurrence?.rules?.[0]?.patternType?.value,
      ...(ruleset?.omission && {
        omission: {
          rules: ruleset?.omission?.rules?.map((rule) => ({
            ...rule,
            patternType: rule?.patternType?.value,
          })),
        },
      }),
      ...(ruleset?.combination && {
        combination: {
          rules: ruleset?.combination?.rules?.map((rule) => ({
            ...rule,
            patternType: rule?.patternType?.value,
          })),
        },
      }),
      templateConfig: {
        templateString: ruleset?.templateConfig?.templateString,
        rules: ruleset?.templateConfig?.rules?.map((r) => {
          return {
            templateMetadataRuleType: r?.templateMetadataRuleType?.value,
            ruleType: {
              ...r?.ruleType,
              templateMetadataRuleFormat:
                r?.ruleType?.templateMetadataRuleFormat?.value,
            },
          };
        }),
      },
    };
    // Deep delete defined keys to prevent issues upon saving
    return deepDeleteKeys(initialValues, [
      'id',
      'label',
      'dateCreated',
      'lastUpdated',
    ]);
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
      initialValues={getInitialValues()}
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
