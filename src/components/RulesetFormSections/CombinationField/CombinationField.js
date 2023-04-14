import PropTypes from 'prop-types';

const CombinationField = ({ name, index, combination }) => {
  return <>{name}{index}</>;
};

CombinationField.propTypes = {
  name: PropTypes.string,
  index: PropTypes.string,
  combination: PropTypes.object,
};

export default CombinationField;
