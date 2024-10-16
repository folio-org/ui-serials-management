import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { useMutation, useQuery } from 'react-query';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { LoadingView } from '@folio/stripes/components';
import { useOkapiKy } from '@folio/stripes/core';

import {
  RULESET_ENDPOINT,
  PIECE_SETS_ENDPOINT,
  REPLACE_AND_DELETE_ENDPOINT,
  REPLACE_AND_DEPRECATE_ENDPOINT,
} from '../../constants/endpoints';

import { RulesetForm } from '../../components/views';
import {
  deepDeleteKeys,
  rulesetSubmiteValuesHandler,
  urls,
} from '../../components/utils';

const RulesetReplaceRoute = () => {
  const history = useHistory();
  const location = useLocation();
  const ky = useOkapiKy();
  const { id, rid } = useParams();

  const handleClose = () => {
    history.push(`${urls.serialView(id)}${location.search}`);
  };

  const { data: pieceSets, pieceSetsLoading } = useQuery(
    ['ui-serials-management', 'SerialView', rid],
    () => ky.get(`${PIECE_SETS_ENDPOINT}?filters=ruleset.id==${rid}`).json()
  );

  const { data: ruleset, isLoading } = useQuery(
    ['ui-serials-management', 'RulesetReplaceRoute', rid],
    () => ky(RULESET_ENDPOINT(rid)).json()
  );

  // istanbul ignore next
  const { mutateAsync: putRuleset } = useMutation(
    ['ui-serials-management', 'RulesetReplaceRoute', 'putRuleset'],
    (data) => {
      const ruleSetEndpoint =
        pieceSets?.length < 1 && !pieceSetsLoading
          ? REPLACE_AND_DELETE_ENDPOINT
          : REPLACE_AND_DEPRECATE_ENDPOINT;
      ky.post(ruleSetEndpoint(rid), {
        json: data,
      })
        .json()
        .then(() => handleClose());
    }
  );

  // istanbul ignore next
  const handleSubmitValues = (values) => {
    const submitValues = rulesetSubmiteValuesHandler(values);
    return {
      ...submitValues,
      owner: { id },
      rulesetNumber: ruleset?.rulesetNumber,
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

export default RulesetReplaceRoute;
