import { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useIntlKeyStore } from '@k-int/stripes-kint-components';

const App = ({ actAs, match: { path } }) => {
  const addKey = useIntlKeyStore((state) => state.addKey);
  addKey('ui-oa');

  if (actAs === 'settings') {
    return <div>Settings go here eventually</div>;
  }

  return (
    <Suspense fallback={null}>
      <Switch>
        <>{path}</>
      </Switch>
    </Suspense>
  );
};

App.propTypes = {
  actAs: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};

export default App;
