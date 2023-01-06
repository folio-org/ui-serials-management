import { useRef } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Button,
  Card,
  Layout,
  Tooltip,
} from '@folio/stripes/components';

import { AppIcon, Pluggable } from '@folio/stripes/core';

const propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  }),
  onResourceSelected: PropTypes.func,
  resource: PropTypes.object,
};

const POLineLookup = ({
  disabled,
  id,
  input: { name, value },
  onResourceSelected,
  resource,
}) => {
  let triggerButton = useRef(null);

  const renderPOLineLinkButton = (v) => (
    <Pluggable
      addLines={onResourceSelected}
      dataKey="find-po-line"
      isSingleSelect
      renderTrigger={(pluggableRenderProps) => {
        triggerButton = pluggableRenderProps.buttonRef;

        const buttonProps = {
          'aria-haspopup': 'true',
          buttonRef: triggerButton,
          buttonStyle: v ? 'default' : 'primary',
          disabled,
          id: `${id}-find-po-line-btn`,
          marginBottom0: true,
          name,
          onClick: pluggableRenderProps.onClick,
        };

        if (value) {
          return (
            <Tooltip
              id={`${id}-po-line-button-tooltip`}
              text={
                <FormattedMessage
                  id="ui-serials-management.serials.poLine.replacePOLineSpecific"
                  values={{ titleOrPackage: resource?.titleOrPackage }}
                />
              }
              triggerRef={triggerButton}
            >
              {({ ariaIds }) => (
                <Button aria-labelledby={ariaIds.text} {...buttonProps}>
                  <FormattedMessage id="ui-serials-management.serials.poLine.replacePOLine" />
                </Button>
              )}
            </Tooltip>
          );
        }
        return (
          <Button {...buttonProps}>
            <FormattedMessage id="ui-serials-management.serials.poLine.linkPOLine" />
          </Button>
        );
      }}
      type="find-po-line"
    >
      <FormattedMessage id="ui-serials-management.serials.poLine.noPlugin" />
    </Pluggable>
  );

  const renderPOLine = () => <>Linked</>;

  const renderEmpty = () => (
    <>
      <Layout className="textCentered">
        <strong>
          <FormattedMessage id="ui-serials-management.serials.poLine.noneLinked" />
        </strong>
      </Layout>
      <Layout className="textCentered">
        <FormattedMessage id="ui-serials-management.serials.poLine.linkToStart" />
      </Layout>
    </>
  );

  return (
    <Card
      cardStyle={value ? 'positive' : 'negative'}
      headerEnd={renderPOLineLinkButton(value)}
      headerStart={
        <AppIcon app="orders" size="small">
          <strong>
            <FormattedMessage id="ui-serials-management.serials.poLine" />
          </strong>
        </AppIcon>
      }
      id={id}
      roundedBorder
    >
      {value ? renderPOLine() : renderEmpty()}
    </Card>
  );
};

POLineLookup.propTypes = propTypes;

export default POLineLookup;
