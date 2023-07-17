import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';

import {
  Button,
  PaneMenu,
  checkScope,
  HasCommand,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';
import { SASQRoute } from '@k-int/stripes-kint-components';

import { SerialView } from '../../components/views';
import {
  RouteSwitcher,
  SerialsFilters,
} from '../../components/SearchAndFilter';
import { focusSASQSearchField } from '../../components/utils';
import urls from '../../components/utils/urls';
import { SERIALS_ENDPOINT } from '../../constants/endpoints';

const SerialsRoute = ({ children, path }) => {
  const history = useHistory();
  const location = useLocation();
  const fetchParameters = {
    endpoint: SERIALS_ENDPOINT,
    SASQ_MAP: {
      searchKey: 'id',
      filterKeys: {
        orderLine: 'orderLine.remoteId',
      },
    },
  };

  const handleCreate = () => {
    history.push(`${urls.serialCreate()}${location.search}`);
  };

  const shortcuts = [
    { name: 'new', handler: () => handleCreate() },
    {
      name: 'search',
      handler: () => focusSASQSearchField('serials'),
    },
  ];

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

  const renderHeaderComponent = () => {
    return <RouteSwitcher primary="serials" />;
  };

  const resultColumns = [
    {
      propertyPath: 'serialStatus',
      label: 'Status',
    },
    {
      propertyPath: 'description',
      label: 'Description',
    },
    {
      propertyPath: 'id',
      label: 'Serial ID',
    },

    // Will be re-implemented when values are stored locally

    // {
    //   propertyPath: 'title',
    //   label: <FormattedMessage id="ui-serials-management.serials.title" />,
    // },
    // {
    //   propertyPath: 'productIDs',
    //   label: <FormattedMessage id="ui-serials-management.serials.productIDs" />,
    // },
    // {
    //   propertyPath: 'poLineNumber',
    //   label: (
    //     <FormattedMessage id="ui-serials-management.serials.poLineNumber" />
    //   ),
    // },
    // {
    //   propertyPath: 'location',
    //   label: <FormattedMessage id="ui-serials-management.serials.location" />,
    // },
    // {
    //   propertyPath: 'predictionPattern',
    //   label: (
    //     <FormattedMessage id="ui-serials-management.serials.predictionPattern" />
    //   ),
    // },
  ];

  const formatter = {
    id: (d) => d?.id,
    serialStatus: (d) => d?.serialStatus?.label,
    // title: (d) => d?.id?.remoteId_object?.titleOrPackage,
    // productIds: (d) => d?.orderLine?.remoteId_object?.details?.productIds?.map((p) => p?.productId)?.join(';'),
    // poLineNumber: (d) => d?.orderLine?.remoteId_object?.poLineNumber,
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
        id="serials"
        mainPaneProps={{
          appIcon: (
            <AppIcon app="serials-management" iconKey="app" size="small" />
          ),
          lastMenu: renderLastMenu,
          paneTitle: <FormattedMessage id="ui-serials-management.serials" />,
        }}
        mclProps={{
          formatter,
          columnWidths: { description: 500 },
        }}
        path={path}
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
