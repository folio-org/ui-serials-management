import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useIntlKeyStore } from '@k-int/stripes-kint-components';
import {
  SerialsRoute,
  SerialsCreateRoute,
  ExpectedPiecesRoute,
  PatternsRoute,
} from './routes';
import Settings from './settings';

const App = (props) => {
  const {
    actAs,
    match: { path },
  } = props;

  const addKey = useIntlKeyStore((state) => state.addKey);
  addKey('ui-serials-management');

  if (actAs === 'settings') {
    return (
      <Suspense fallback={null}>
        <Settings {...props} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={null}>
      <Switch>
        <Route
          component={SerialsCreateRoute}
          path={`${path}/serials/create`}
        />
        <SerialsRoute path={`${path}/serials`} />
        <ExpectedPiecesRoute path={`${path}/expectedPieces`} />
        <PatternsRoute path={`${path}/patterns`} />
      </Switch>
    </Suspense>
  );
};

App.propTypes = {
  actAs: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};

export default App;
