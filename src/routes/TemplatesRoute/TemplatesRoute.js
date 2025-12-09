import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';

import { SASQRoute } from '@k-int/stripes-kint-components';

import { IfPermission } from '@folio/stripes/core';
import { Button, PaneMenu } from '@folio/stripes/components';

import { TemplateView } from '../../components/views';
import { RouteSwitcher, RulesetFilters } from '../../components/SearchAndFilter';
import { MODEL_RULESETS_ENDPOINT } from '../../constants/endpoints';
import urls from '../../components/utils/urls';

const TemplatesRoute = ({ children, path }) => {
  const fetchParameters = {
    endpoint: MODEL_RULESETS_ENDPOINT,
    SASQ_MAP: {
      searchKey: 'name,description',
      perPage: 50,
      filterKeys: {
        modelRulesetStatus: 'modelRulesetStatus.value'
      }
    },
  };

  const history = useHistory();
  const location = useLocation();

  const renderHeaderComponent = () => {
    return <RouteSwitcher primary="templates" />;
  };

  const handleCreate = () => {
    history.push(`${urls.templateCreate()}${location.search}`);
  };

  const renderLastMenu = (
    <IfPermission perm="ui-serials-management.modelrulesets.manage">
      <PaneMenu>
        <FormattedMessage id="ui-serials-management.templates.newTemplate">
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

  const resultColumns = [
    {
      propertyPath: 'name',
      label: <FormattedMessage id="ui-serials-management.templates.name" />,
    },
    {
      propertyPath: 'modelRulesetStatus',
      label: <FormattedMessage id="ui-serials-management.templates.status" />,
    },
    {
      propertyPath: 'description',
      label: <FormattedMessage id="ui-serials-management.templates.description" />,
    },
    {
      propertyPath: 'exampleLabel',
      label: <FormattedMessage id="ui-serials-management.templates.exampleLabel" />,
    },
  ];

  const formatter = {
    name: (d) => d?.name,
    modelRulesetStatus: (d) => d?.modelRulesetStatus?.label,
    description: (d) => d?.description,
  };

  return (
    <SASQRoute
      fetchParameters={fetchParameters}
      FilterComponent={RulesetFilters}
      FilterPaneHeaderComponent={renderHeaderComponent}
      id="templates"
      mainPaneProps={{
        lastMenu: renderLastMenu,
        paneTitle: (
          <FormattedMessage id="ui-serials-management.templates" />
        ),
      }}
      mclProps={{
        formatter,
        id: 'list-templates'
      }}
      path={path}
      resultColumns={resultColumns}
      sasqProps={{
        initialSortState: { sort: 'name', direction: 'ascending' },
        sortableColumns: ['name'],
      }}
      searchFieldAriaLabel="templates-search-field"
      ViewComponent={TemplateView}
    >
      {children}
    </SASQRoute>
  );
};

TemplatesRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  path: PropTypes.string,
};

export default TemplatesRoute;
