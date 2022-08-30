import PropTypes from 'prop-types';
import SerialsManagementView from './components/SerialsManagementView';

const App = ({ actAs }) => {
  if (actAs === 'settings') {
    return <div>Settings go here eventually</div>;
  }

  return <SerialsManagementView />;
};

App.propTypes = {
  actAs: PropTypes.string.isRequired,
};

export default App;
