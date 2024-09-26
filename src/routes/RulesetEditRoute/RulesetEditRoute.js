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

  console.log(ruleset);

  // istanbul ignore next
  const handleSubmitValues = (values) => {
    const submitValues = {
      ...values,
    };
    return submitValues;
  };

  const getInitialValues = () => {
    const iv = {
      ...ruleset,
      patternType: ruleset?.recurrence?.rules?.[0]?.patternType?.value,
      omission: {
        ...ruleset?.omission,
        patternType: ruleset?.omission?.rules?.[0]?.patternType?.value,
      },
      combination: {
        ...ruleset?.combination,
        patternType: ruleset?.combination?.rules?.[0]?.patternType?.value,
      },
    };
    console.log(iv);
    return iv;
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
