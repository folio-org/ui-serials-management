import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';

import {
  Button,
  PaneMenu,
  checkScope,
  HasCommand,
  TextLink,
} from '@folio/stripes/components';
import { AppIcon, IfPermission } from '@folio/stripes/core';
import { SASQRoute } from '@k-int/stripes-kint-components';

import { SerialView } from '../../components/views';
import {
  RouteSwitcher,
  SerialsFilters,
} from '../../components/SearchAndFilter';
import { focusSASQSearchField } from '../../components/utils';
import urls from '../../components/utils/urls';
import { SERIALS_ENDPOINT } from '../../constants/endpoints';
import {
  MAIN_FILTER_PANE_CONFIG,
  MAIN_PANE_ID,
  MAIN_PANESET_CONFIG
} from '../../constants/panesetConfigs';

const SerialsRoute = ({ children, path }) => {
  const history = useHistory();
  const location = useLocation();
  const fetchParameters = {
    endpoint: SERIALS_ENDPOINT,
    SASQ_MAP: {
      searchKey: 'id,description,orderLine.title',
      filterKeys: {
        serialStatus: 'serialStatus.value',
        orderLine: 'orderLine.remoteId',
      },
      perPage: 50,
      sortKeys: {
        title: 'orderLine.title,id',
      },
    },
  };

  const handleCreate = () => {
    history.push(`${urls.serialCreate()}${location.search}`);
  };
  /* istanbul ignore next */
  const shortcuts = [
    { name: 'new', handler: () => handleCreate() },
    {
      name: 'search',
      handler: () => focusSASQSearchField('serials'),
    },
  ];
  /* istanbul ignore next */
  const renderLastMenu = (
    <IfPermission perm="ui-serials-management.serials.edit">
      <PaneMenu>
        <FormattedMessage id="ui-serials-management.serials.newSerial">
          {([ariaLabel]) => (
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
    </IfPermission>
  );
  /* istanbul ignore next */
  const renderHeaderComponent = () => {
    return <RouteSwitcher primary="serials" />;
  };

  const resultColumns = [
    {
      propertyPath: 'title',
      label: <FormattedMessage id="ui-serials-management.serials.title" />,
    },
    {
      propertyPath: 'serialStatus',
      label: <FormattedMessage id="ui-serials-management.serials.status" />,
    },
    {
      propertyPath: 'description',
      label: (
        <FormattedMessage id="ui-serials-management.serials.description" />
      ),
    },
  ];

  const renderTitle = (serial) => {
    return (
      <TextLink to={`${urls.serialView(serial?.id)}${location.search}`}>
        {serial?.orderLine?.title ?? serial?.id}
      </TextLink>
    );
  };

  /* istanbul ignore next */
  const formatter = {
    title: (d) => renderTitle(d),
    serialStatus: (d) => d?.serialStatus?.label,
    description: (d) => d?.description,
  };

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <SASQRoute
        fetchParameters={fetchParameters}
        FilterComponent={SerialsFilters}
        FilterPaneHeaderComponent={renderHeaderComponent}
        filterPaneProps={MAIN_FILTER_PANE_CONFIG}
        id="serials"
        mainPaneProps={{
          appIcon: (
            <AppIcon app="serials-management" iconKey="app" size="small" />
          ),
          lastMenu: renderLastMenu,
          paneTitle: <FormattedMessage id="ui-serials-management.serials" />,
          id: MAIN_PANE_ID,
        }}
        mclProps={{
          formatter,
          columnWidths: { description: 500 },
          interactive: false,
          onRowClick: null,
          id: 'list-serials',
        }}
        path={path}
        persistedPanesetProps={MAIN_PANESET_CONFIG}
        resultColumns={resultColumns}
        searchFieldAriaLabel="serials-search-field"
        ViewComponent={SerialView}
      >
        {children}
      </SASQRoute>
    </HasCommand>
  );
};

SerialsRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  path: PropTypes.string.isRequired,
};

export default SerialsRoute;
