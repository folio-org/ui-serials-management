import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSet,
  FilterAccordionHeader,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

import POLineFilter from '../POLineFilter';

const propTypes = {
  activeFilters: PropTypes.object,
  filterHandlers: PropTypes.object,
};

const SerialsFilters = ({ activeFilters, filterHandlers }) => {
  const onChangeHandler = (group) => {
    filterHandlers.state({
      ...activeFilters,
      [group.name]: group.values,
    });
  };

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
        <POLineFilter name="orderLine" onPOLineSelected={onChangeHandler} />
      </Accordion>
    );
  };

  return (
    <>
      <AccordionSet>{renderPOLineFilter()}</AccordionSet>
    </>
  );
};

SerialsFilters.propTypes = propTypes;

export default SerialsFilters;
