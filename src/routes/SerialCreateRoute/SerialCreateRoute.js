import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { useHistory, useLocation } from 'react-router-dom';

import { SerialForm } from '../../components/views';
import urls from '../../components/utils/urls';

const SerialCreateRoute = () => {
  const history = useHistory();
  const location = useLocation();

  const handleClose = () => {
    history.push(`${urls.serials()}${location.search}`);
  };

  return (
    <>
      <Form mutators={arrayMutators} onSubmit={handleClose}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <SerialForm
              handlers={{
                onClose: handleClose,
                onSubmit: handleClose,
              }}
            />
          </form>
        )}
      </Form>
    </>
  );
};

export default SerialCreateRoute;
