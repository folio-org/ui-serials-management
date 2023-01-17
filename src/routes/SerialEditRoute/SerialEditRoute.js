import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { useMutation, useQuery } from 'react-query';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { useOkapiKy } from '@folio/stripes/core';
import { LoadingView } from '@folio/stripes/components';

import { SerialForm } from '../../components/views';
import { SERIAL_ENDPOINT } from '../../constants/endpoints';
import { urls } from '../../components/utils';

const SerialEditRoute = () => {
  const history = useHistory();
  const location = useLocation();
  const ky = useOkapiKy();
  const { id } = useParams();

  const handleClose = () => {
    history.push(`${urls.serials()}${location.search}`);
  };

  const { data: serial, isLoading } = useQuery(
    ['ui-serials-management', 'SerialEditRoute', id],
    () => ky(SERIAL_ENDPOINT(id)).json()
  );

  const { mutateAsync: putSerial } = useMutation(
    ['ui-serials-management', 'SerialEditRoute', 'putSerial'],
    (data) => {
      ky.put(SERIAL_ENDPOINT(id), { json: data })
        .json()
        .then(() => handleClose());
    }
  );

  const submitSerial = async (values) => {
    const submitValues = {
      ...values,
      ...(values?.orderLine && {
        orderLine: { remoteId: values?.orderLine?.id },
      }),
    };
    await putSerial(submitValues);
  };

  if (isLoading) {
    return <LoadingView dismissible onClose={handleClose} />;
  }
  return (
    <>
      <Form
        initialValues={{
          ...serial,
          ...(!!serial?.orderLine && {
            orderLine: serial?.orderLine?.remoteId_object,
          }),
        }}
        mutators={arrayMutators}
        onSubmit={submitSerial}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <SerialForm
              handlers={{
                onClose: handleClose,
                onSubmit: handleSubmit,
              }}
            />
          </form>
        )}
      </Form>
    </>
  );
};

export default SerialEditRoute;
