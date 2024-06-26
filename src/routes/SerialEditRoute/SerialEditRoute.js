import arrayMutators from 'final-form-arrays';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { useOkapiKy } from '@folio/stripes/core';
import { LoadingView } from '@folio/stripes/components';

import { ERMForm } from '@folio/stripes-erm-components';

import { SerialForm } from '../../components/views';
import { SERIAL_ENDPOINT } from '../../constants/endpoints';
import { urls } from '../../components/utils';

const SerialEditRoute = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const location = useLocation();
  const ky = useOkapiKy();
  const { id } = useParams();
  /* istanbul ignore next */
  const handleClose = () => {
    history.push(`${urls.serialView(id)}${location.search}`);
  };

  const { data: serial, isLoading } = useQuery(
    ['ui-serials-management', 'SerialEditRoute', id],
    () => ky(SERIAL_ENDPOINT(id)).json()
  );
  /* istanbul ignore next */
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
  /* istanbul ignore next */
  const submitSerial = async (values) => {
    const submitValues = {
      ...values,
      ...(!values?.serialStatus?.value
        ? { serialStatus: null }
        : { serialStatus: { value: values?.serialStatus?.value } }),
      ...(values?.orderLine
        ? {
          orderLine: {
            remoteId: values?.orderLine?.id,
            title: values?.orderLine?.titleObject?.title,
            titleId: values?.orderLine?.titleObject?.id,
          },
        }
        : { orderLine: null }),
    };
    await putSerial(submitValues);
  };

  if (isLoading) {
    return <LoadingView dismissible onClose={handleClose} />;
  }

  return (
    <ERMForm
      initialValues={{
        ...serial,
        ...(!!serial?.orderLine && {
          orderLine: {
            ...serial?.orderLine?.remoteId_object,
            /* This object (titleObject) is used later and a useEffect inserts into form state,
             * so any changes to this state shape need to be reflected in the useEffect
             * in POLineForm.
             */
            titleObject: {
              title: serial?.orderLine?.title,
              id: serial?.orderLine?.titleId,
            },
          },
        }),
      }}
      keepDirtyOnReinitialize
      mutators={arrayMutators}
      onSubmit={submitSerial}
    >
      {({ handleSubmit }) => (
        <SerialForm
          handlers={{
            onClose: handleClose,
            onSubmit: handleSubmit,
          }}
        />
      )}
    </ERMForm>
  );
};

export default SerialEditRoute;
