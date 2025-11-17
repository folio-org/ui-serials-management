import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { SASQRoute } from '@k-int/stripes-kint-components';

import { RouteSwitcher, RulesetFilters } from '../../components/SearchAndFilter';
import { MODEL_RULESETS_ENDPOINT } from '../../constants/endpoints';

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

  const renderHeaderComponent = () => {
    return <RouteSwitcher primary="templates" />;
  };

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
        paneTitle: (
          <FormattedMessage id="ui-serials-management.templates" />
        ),
      }}
      mclProps={{
        formatter,
        interactive: false,
        onRowClick: null,
        id: 'list-templates'
      }}
      path={path}
      resultColumns={resultColumns}
      searchFieldAriaLabel="templates-search-field"
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
