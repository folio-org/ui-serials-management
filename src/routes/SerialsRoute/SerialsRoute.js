import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';

import { Button, PaneMenu } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';
import { SASQRoute } from '@k-int/stripes-kint-components';

import { SerialsView } from '../../components/views';
import RouteSwitcher from '../../components/SearchAndFilter';
import urls from '../../components/utils/urls';

const SerialsRoute = ({ children, path }) => {
  const history = useHistory();
  const location = useLocation();

  const handleCreate = () => {
    history.push(`${urls.serialCreate()}${location.search}`);
  };
  const renderLastMenu = (
    <PaneMenu>
      <FormattedMessage id="ui-serials-management.serials.newSerial">
        {(ariaLabel) => (
          <Button
            aria-label={ariaLabel}
            buttonStyle="primary"
            id="clickable-new-serial"
            marginBottom0
            onClick={() => handleCreate()}
          >
            <FormattedMessage id="ui-serials-management.new" />
          </Button>
        )}
      </FormattedMessage>
    </PaneMenu>
  );

  const resultColumns = [
    {
      propertyPath: 'poLineNumber',
      label: (
        <FormattedMessage id="ui-serials-management.serials.poLineNumber" />
      ),
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
      label: <FormattedMessage id="ui-serials-management.serials.location" />,
    },
    {
      propertyPath: 'predictionPattern',
      label: (
        <FormattedMessage id="ui-serials-management.serials.predictionPattern" />
      ),
    },
  ];

  return (
    <SASQRoute
      fetchParameters={{}}
      FilterPaneHeaderComponent={RouteSwitcher}
      id="serials"
      mainPaneProps={{
        appIcon: (
          <AppIcon app="serials-management" iconKey="app" size="small" />
        ),
        lastMenu: renderLastMenu,
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
