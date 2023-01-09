import { useRef } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { Button, Card, Layout, Tooltip } from '@folio/stripes/components';
import { AppIcon, Pluggable } from '@folio/stripes/core';

import { urls } from '../../utils';

const propTypes = {
  children: PropTypes.node,
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
  children,
  disabled,
  id,
  input: { name, value },
  onResourceSelected,
  resource,
}) => {
  let triggerButton = useRef(null);

  const renderPOLineLinkButton = () => (
    <Pluggable
      addLines={onResourceSelected}
      dataKey="find-po-line"
      isSingleSelect
      renderTrigger={(pluggableRenderProps) => {
        triggerButton = pluggableRenderProps.buttonRef;

        const buttonProps = {
          'aria-haspopup': 'true',
          buttonRef: triggerButton,
          buttonStyle: value ? 'default' : 'primary',
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
                  id="ui-serials-management.poLine.replacePOLineSpecific"
                  values={{ identifier: resource?.poLineNumber }}
                />
              }
              triggerRef={triggerButton}
            >
              {({ ariaIds }) => (
                <Button aria-labelledby={ariaIds.text} {...buttonProps}>
                  <FormattedMessage id="ui-serials-management.poLine.replacePOLine" />
                </Button>
              )}
            </Tooltip>
          );
        }
        return (
          <Button {...buttonProps}>
            <FormattedMessage id="ui-serials-management.poLine.selectPOLine" />
          </Button>
        );
      }}
      type="find-po-line"
    >
      <FormattedMessage id="ui-serials-management.poLine.noPlugin" />
    </Pluggable>
  );

  const renderEmpty = () => (
    <>
      <Layout className="textCentered">
        <strong>
          <FormattedMessage id="ui-serials-management.poLine.noneLinked" />
        </strong>
      </Layout>
      <Layout className="textCentered">
        <FormattedMessage id="ui-serials-management.poLine.linkToStart" />
      </Layout>
    </>
  );

  return (
    <Card
      cardStyle={value ? 'positive' : 'negative'}
      headerEnd={renderPOLineLinkButton()}
      headerStart={
        <AppIcon app="orders" size="small">
          {resource?.id ? (
            <Link to={urls.poLineView(resource?.id)}>
              <strong>
                <FormattedMessage id="ui-serials-management.poLine" />
                {': ' + resource?.poLineNumber}
              </strong>
            </Link>
          ) : (
            <strong>
              <FormattedMessage id="ui-serials-management.poLine" />
            </strong>
          )}
        </AppIcon>
      }
      id={id}
      roundedBorder
    >
      {value ? children : renderEmpty()}
    </Card>
  );
};

POLineLookup.propTypes = propTypes;

export default POLineLookup;
