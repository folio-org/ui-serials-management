import arrayMutators from 'final-form-arrays';

import { useMutation } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';

import { useOkapiKy } from '@folio/stripes/core';

import { ERMForm } from '@folio/stripes-erm-components';

import { SerialForm } from '../../components/views';
import { SERIALS_ENDPOINT } from '../../constants/endpoints';
import urls from '../../components/utils/urls';

const SerialCreateRoute = () => {
  const history = useHistory();
  const location = useLocation();
  const ky = useOkapiKy();

  const handleClose = () => {
    history.push(`${urls.serials()}${location.search}`);
  };

  const { mutateAsync: postSerial } = useMutation(
    ['ui-serials-management', 'SerialCreateRoute', 'postSerial'],
    (data) => {
      ky.post(SERIALS_ENDPOINT, { json: data })
        .json()
        .then(() => handleClose());
    }
  );

  const submitSerial = async (values) => {
    const submitValues = {
      ...values,
      ...(values?.orderLine && {
        orderLine: {
          remoteId: values?.orderLine?.id,
          title: values?.orderLine?.titleObject?.title,
          titleId: values?.orderLine?.titleObject?.id,
        },
      }),
    };
    await postSerial(submitValues);
  };

  return (
    <ERMForm
      initialValues={{
        serialStatus: { value: 'active' },
      }}
      keepDirtyOnReinitialize
      mutators={arrayMutators}
      onSubmit={submitSerial}
      subscription={{ values: true }}
    >
      {({ handleSubmit }) => (
        <form id="serial-form" onSubmit={handleSubmit}>
          <SerialForm
            handlers={{
              onClose: handleClose,
              onSubmit: handleSubmit,
            }}
          />
        </form>
      )}
    </ERMForm>
  );
};

export default SerialCreateRoute;
