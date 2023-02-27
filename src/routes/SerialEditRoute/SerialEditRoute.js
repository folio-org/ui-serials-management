import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { useOkapiKy } from '@folio/stripes/core';
import { LoadingView } from '@folio/stripes/components';

import { SerialForm } from '../../components/views';
import { SERIAL_ENDPOINT } from '../../constants/endpoints';
import { urls } from '../../components/utils';

const SerialEditRoute = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const location = useLocation();
  const ky = useOkapiKy();
  const { id } = useParams();

  const handleClose = () => {
    history.push(`${urls.serialView(id)}${location.search}`);
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
        .then(() => {
          queryClient.invalidateQueries([
            'ui-serials-management',
            'SerialEditRoute',
            id,
          ]);
          handleClose();
        });
    }
  );

  const submitSerial = async (values) => {
    const submitValues = {
      ...values,
      ...(!values?.serialStatus?.value
        ? { serialStatus: null }
        : { serialStatus: { value: values?.serialStatus?.value } }),
      ...(values?.orderLine && {
        orderLine: { remoteId: values?.orderLine?.id },
      }),
    };
    submitValues?.recurrence?.rules?.forEach((e) => {
      if (!e?.ordinal) {
        e.ordinal = 1;
      }
      e.patternType = submitValues?.patternType;
    });
    // POST Request can work without deleting patternType
    // Deleting just for clarity
    delete submitValues.patternType;
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
          ...(serial?.recurrence?.rules && {
            patternType: serial?.recurrence?.rules[0]?.patternType?.value,
          }),
        }}
        keepDirtyOnReinitialize
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
