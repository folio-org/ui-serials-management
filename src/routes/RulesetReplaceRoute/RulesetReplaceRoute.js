import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { useMutation, useQuery } from 'react-query';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { LoadingView } from '@folio/stripes/components';
import { useOkapiKy } from '@folio/stripes/core';

import { useGenerateNumber } from '@folio/service-interaction';

import { RulesetForm } from '../../components/views';

import { REPLACE_AND_DELETE } from '../../constants/replaceTypes';
import {
  RULESET_ENDPOINT,
  REPLACE_AND_DELETE_ENDPOINT,
  REPLACE_AND_DEPRECATE_ENDPOINT,
} from '../../constants/endpoints';

import {
  deepDeleteKeys,
  rulesetSubmitValuesHandler,
  urls,
} from '../../components/utils';

const RulesetReplaceRoute = () => {
  const history = useHistory();
  const location = useLocation();
  const ky = useOkapiKy();
  const { id, rid, replaceType } = useParams();
  const { generate } = useGenerateNumber({
    callback: (string) => {
      return string;
    },
    generator: 'serialsManagement_patternNumber',
    sequence: 'patternNumber',
  });

  const handleClose = (newRulesetId) => {
    if (newRulesetId) {
      history.push(`${urls.rulesetView(id, newRulesetId)}${location.search}`);
    } else {
      history.push(`${urls.rulesetView(id, rid)}${location.search}`);
    }
  };

  const { data: ruleset, isLoading } = useQuery(
    ['ui-serials-management', 'RulesetReplaceRoute', rid],
    () => ky(RULESET_ENDPOINT(rid)).json()
  );

  const { mutateAsync: replaceAndDeprecate } = useMutation(
    ['ui-serials-management', 'RulesetReplaceRoute', 'replaceAndDeprecate'],
    (data) => {
      ky.post(REPLACE_AND_DEPRECATE_ENDPOINT(rid), {
        json: data,
      })
        .json()
        .then((res) => {
          handleClose(res?.id);
        });
    }
  );

  const { mutateAsync: replaceAndDelete } = useMutation(
    ['ui-serials-management', 'RulesetReplaceRoute', 'replaceAndDelete'],
    (data) => {
      ky.post(REPLACE_AND_DELETE_ENDPOINT(rid), {
        json: data,
      })
        .json()
        .then((res) => {
          handleClose(res?.id);
        });
    }
  );

  const handleSubmitValues = (values) => {
    const submitValues = rulesetSubmitValuesHandler(values);
    return {
      ...submitValues,
      owner: { id },
    };
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
      'owner',
    ]);
  };

  const submitRuleset = async (values) => {
    const submitValues = handleSubmitValues(values);
    if (replaceType === REPLACE_AND_DELETE) {
      await replaceAndDelete({
        ...submitValues,
        rulesetNumber: ruleset?.rulesetNumber,
      });
    } else {
      const numberGeneratorReturn = await generate();
      await replaceAndDeprecate({
        ...submitValues,
        rulesetNumber: numberGeneratorReturn?.data?.nextValue,
      });
    }
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

export default RulesetReplaceRoute;
