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
  getRulesetFormValues,
  rulesetSubmitValuesHandler,
  urls,
} from '../../components/utils';

import { useModelRuleset } from '../../hooks';

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

  const { selectedModelRuleset, handleSelectModelRuleset } = useModelRuleset();

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

  const initialValues = selectedModelRuleset?.serialRuleset
    ? getRulesetFormValues(selectedModelRuleset.serialRuleset)
    : getRulesetFormValues(ruleset);

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
      id="ruleset-replace-form"
      initialValues={initialValues}
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

export default RulesetReplaceRoute;
