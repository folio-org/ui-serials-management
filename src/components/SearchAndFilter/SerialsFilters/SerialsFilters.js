import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  AccordionSet,
  FilterAccordionHeader,
} from '@folio/stripes/components';

import { CheckboxFilter } from '@folio/stripes/smart-components';

import { selectifyRefdata } from '@folio/stripes-erm-components';

import POLineFilter from '../POLineFilter';
import { useSerialsManagementRefdata } from '../../utils';

const propTypes = {
  activeFilters: PropTypes.object,
  filterHandlers: PropTypes.object,
};

const SerialsFilters = ({ activeFilters, filterHandlers }) => {
  const [SERIAL_STATUS] = ['Serial.SerialStatus'];

  const refdataValues = useSerialsManagementRefdata([SERIAL_STATUS]);

  const serialStatusValues = selectifyRefdata(
    refdataValues,
    SERIAL_STATUS,
    'value'
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

  const selectedStatus = getSelectedValues('serialStatus', 'serialStatus');

  const renderPOLineFilter = () => {
    return (
      <Accordion
        displayClearButton={activeFilters?.orderLine?.length > 0}
        header={FilterAccordionHeader}
        id="po-line-filter-accordion"
        label={<FormattedMessage id="ui-serials-management.poLine" />}
        onClearFilter={() => {
          filterHandlers.clearGroup('orderLine');
        }}
        separator={false}
      >
        <POLineFilter
          name="orderLine"
          onPOLineSelected={(poLine) => {
            filterHandlers.state({ ...activeFilters, orderLine: [poLine.id] });
          }}
        />
      </Accordion>
    );
  };

  const renderRequestStatusFilter = () => {
    return (
      <Accordion
        displayClearButton={selectedStatus.length > 0}
        header={FilterAccordionHeader}
        id="serial-status-filter-accordion"
        label={<FormattedMessage id="ui-serials-management.serials.status" />}
        onClearFilter={() => {
          filterHandlers.clearGroup('serialStatus');
        }}
        separator={false}
      >
        <CheckboxFilter
          dataOptions={serialStatusValues}
          name="serialStatus"
          onChange={(s) => {
            filterHandlers.state({
              ...activeFilters,
              serialStatus: s?.values,
            });
          }}
          selectedValues={selectedStatus}
        />
      </Accordion>
    );
  };

  return (
    <AccordionSet>
      {renderRequestStatusFilter()}
      {renderPOLineFilter()}
    </AccordionSet>
  );
};

SerialsFilters.propTypes = propTypes;

export default SerialsFilters;
