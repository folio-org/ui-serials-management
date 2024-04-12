import { useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button } from '@folio/stripes/components';
import { Pluggable } from '@folio/stripes/core';

const propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onPOLineSelected: PropTypes.func,
};

const POLineFilter = ({ disabled, name, onPOLineSelected }) => {
  let triggerButton = useRef(null);
  return (
    <div data-testid="selectPOLinePluggin">
      <Pluggable
        addLines={(poLines) => onPOLineSelected(poLines[0])}
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
          /* istanbul ignore next */
          return (
            <Button disabled={disabled} marginBottom0 {...buttonProps}>
              <FormattedMessage id="ui-serials-management.poLine.selectPOLine" />
            </Button>
          );
        }}
        type="find-po-line"
      >
        <FormattedMessage id="ui-serials-management.poLine.noPlugin" />
      </Pluggable>
    </div>
  );
};

POLineFilter.propTypes = propTypes;

export default POLineFilter;
