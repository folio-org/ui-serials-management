import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { SASQRoute } from '@k-int/stripes-kint-components';
import { PatternsView } from '../../components/views';
import RouteSwitcher from '../../components/SearchAndFilter';

const PatternsRoute = ({ children, path }) => {
  const renderHeaderComponent = () => {
    return <RouteSwitcher primary="patterns" />;
  };

  const resultColumns = [
    {
      propertyPath: 'patterns',
      label: (
        <FormattedMessage id="ui-serials-management.serials.patterns" />
      ),
    },
  ];

  return (
    <SASQRoute
      fetchParameters={{}}
      FilterPaneHeaderComponent={renderHeaderComponent}
      id="patterns"
      mainPaneProps={{
        paneTitle: <FormattedMessage id="ui-serials-management.patterns" />,
      }}
      path={path}
      resultColumns={resultColumns}
      searchFieldAriaLabel="patterns-search-field"
      ViewComponent={PatternsView}
    >
      {children}
    </SASQRoute>
  );
};

PatternsRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  path: PropTypes.string.isRequired,
};

export default PatternsRoute;
