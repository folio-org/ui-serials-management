import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  AccordionSet,
  FilterAccordionHeader,
} from '@folio/stripes/components';

import { CheckboxFilter } from '@folio/stripes/smart-components';

import { selectifyRefdata } from '@folio/stripes-erm-components';

import { useSerialsManagementRefdata } from '../../utils';

const propTypes = {
  activeFilters: PropTypes.object,
  filterHandlers: PropTypes.object,
};

const RulesetFilters = ({ activeFilters, filterHandlers }) => {
  const [MODEL_RULESET_STATUS] = ['ModelRuleset.ModelRulesetStatus'];

  const refdataValues = useSerialsManagementRefdata([MODEL_RULESET_STATUS]);

  const modelRulesetStatusValues = selectifyRefdata(
    refdataValues,
    MODEL_RULESET_STATUS,
    'value',
    'label'
  );

  const getSelectedValues = (name, prefix) => {
    const activeValue = activeFilters?.[name];
    if (Array.isArray(activeValue)) return activeValue.map((v) => String(v));
    if (activeValue) return [String(activeValue)];

    // fallback to state property
    const stateValue = activeFilters?.state?.[name];
    if (Array.isArray(stateValue)) return stateValue.map((v) => String(v));
    if (stateValue) return [String(stateValue)];

    // fallback to filter string format
    const filterString = activeFilters?.string || '';
    if (!filterString) return [];

    return filterString
      .split(',')
      .filter((f) => f.startsWith(`${prefix}.`))
      .map((f) => f.replace(`${prefix}.`, ''));
  };

  const selectedStatus = getSelectedValues('modelRulesetStatus', 'modelRulesetStatus');

  const renderModelRulesetStatusFilter = () => {
    return (
      <Accordion
        displayClearButton={selectedStatus.length > 0}
        header={FilterAccordionHeader}
        id="ruleset-status-filter-accordion"
        label={<FormattedMessage id="ui-serials-management.templates.status" />}
        onClearFilter={() => {
          filterHandlers.clearGroup('modelRulesetStatus');
        }}
        separator={false}
      >
        <CheckboxFilter
          dataOptions={modelRulesetStatusValues}
          name="modelRulesetStatus"
          onChange={(m) => {
            filterHandlers.state({
              ...activeFilters,
              modelRulesetStatus: m?.values,
            });
          }}
          selectedValues={selectedStatus}
        />
      </Accordion>
    );
  };

  return (
    <AccordionSet>
      {renderModelRulesetStatusFilter()}
    </AccordionSet>
  );
};

RulesetFilters.propTypes = propTypes;

export default RulesetFilters;
