import PropTypes from 'prop-types';

import { Pane, LoadingPane } from '@folio/stripes/components';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  resource: PropTypes.object,
  queryProps: PropTypes.object,
};

const ExpectedPiecesView = ({ resource, onClose, queryProps: { isLoading } }) => {
  if (isLoading) {
    return <LoadingPane dismissible onClose={onClose} />;
  }

  return (
    <Pane dismissible onClose={onClose}>
      {resource?.expectedPieces}
    </Pane>
  );
};

ExpectedPiecesView.propTypes = propTypes;

export default ExpectedPiecesView;
