import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { SASQRoute } from '@k-int/stripes-kint-components';
import SerialsView from '../../components/views/SerialsView';

const SerialsRoute = ({ children, path }) => {
  const resultColumns = [
    {
      propertyPath: 'poLineNumber',
      label: <FormattedMessage id="ui-serials-management.serials.poLineNumber" />,
    },
    {
      propertyPath: 'title',
      label: <FormattedMessage id="ui-serials-management.serials.title" />,
    },
    {
      propertyPath: 'productIDs',
      label: <FormattedMessage id="ui-serials-management.serials.productIDs" />,
    },
    {
      propertyPath: 'location',
      label: (
        <FormattedMessage id="ui-serials-management.serials.location" />
      ),
    },
    {
      propertyPath: 'predictionPattern',
      label: (
        <FormattedMessage id="uui-serials-management.serials.predictionPattern" />
      ),
    },
  ];

  return (
    <SASQRoute
      fetchParameters={{}}
      id="serials"
      mainPaneProps={{
        paneTitle: <FormattedMessage id="ui-serials-management.serials" />,
      }}
      path={path}
      resultColumns={resultColumns}
      searchFieldAriaLabel="serials-search-field"
      ViewComponent={SerialsView}
    >
      {children}
    </SASQRoute>
  );
};

SerialsRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  path: PropTypes.string.isRequired,
};

export default SerialsRoute;
