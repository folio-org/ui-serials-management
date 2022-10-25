import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { SASQRoute } from '@k-int/stripes-kint-components';
import { ExpectedPiecesView } from '../../components/views';

const ExpectedPiecesRoute = ({ children, path }) => {
  const resultColumns = [
    {
      propertyPath: 'expectedPieces',
      label: <FormattedMessage id="ui-serials-management.expectedPieces" />,
    },
  ];

  return (
    <SASQRoute
      fetchParameters={{}}
      id="expected-pieces"
      mainPaneProps={{
        paneTitle: <FormattedMessage id="ui-serials-management.expectedPieces" />,
      }}
      path={path}
      resultColumns={resultColumns}
      searchFieldAriaLabel="expected-pieces-search-field"
      ViewComponent={ExpectedPiecesView}
    >
      {children}
    </SASQRoute>
  );
};

ExpectedPiecesRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  path: PropTypes.string.isRequired,
};

export default ExpectedPiecesRoute;
