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

  const renderModelRulesetStatusFilter = () => {
    return (
      <Accordion
        displayClearButton={activeFilters?.modelRulesetStatus?.length > 0}
        header={FilterAccordionHeader}
        id="status-status-filter-accordion"
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
          selectedValues={activeFilters?.modelRulesetStatus || []}
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
