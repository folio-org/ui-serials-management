import { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useIntlKeyStore } from '@k-int/stripes-kint-components';
import { SerialsRoute, ExpectedPiecesRoute, PatternsRoute } from './routes';

const App = ({ actAs, match: { path } }) => {
  const addKey = useIntlKeyStore((state) => state.addKey);
  addKey('ui-serials-management');

  if (actAs === 'settings') {
    return <div>Settings go here eventually</div>;
  }

  return (
    <Suspense fallback={null}>
      <Switch>
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
