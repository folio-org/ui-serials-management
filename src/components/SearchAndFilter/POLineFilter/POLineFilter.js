import { useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button } from '@folio/stripes/components';
import { Pluggable } from '@folio/stripes/core';

const propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onPOLineSelected: PropTypes.func.isRequired,
};

const POLineFilter = ({ disabled, name, onPOLineSelected }) => {
  let triggerButton = useRef(null);
  return (
    <Pluggable
      addLines={(poLines) => onPOLineSelected({ name, values: poLines[0]?.id })}
      dataKey={`po-line-filter-button-${name}`}
      isSingleSelect
      renderTrigger={(pluggableRenderProps) => {
        triggerButton = pluggableRenderProps.buttonRef;
        const buttonProps = {
          'aria-haspopup': 'true',
          buttonRef: triggerButton,
          id: `${name}-po-line-search`,
          onClick: pluggableRenderProps.onClick,
        };
        return (
          <Button disabled={disabled} marginBottom0 {...buttonProps}>
            <FormattedMessage id="ui-serials-management.poLine.selectPOLine" />
          </Button>
        );
      }}
      type="find-po-line"
    >
      <FormattedMessage id="ui-serials-management.poLine.noPOLinePlugin" />
    </Pluggable>
  );
};

POLineFilter.propTypes = propTypes;

export default POLineFilter;
