import PropTypes from 'prop-types';

const App = ({ actAs }) => {
  if (actAs === 'settings') {
    return <div>Settings go here eventually</div>;
  }

  return null;
};

App.propTypes = {
  actAs: PropTypes.string.isRequired,
};

export default App;
