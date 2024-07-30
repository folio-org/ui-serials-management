import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import {
  Accordion,
  Card,
  Col,
  Row,
  KeyValue,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import SerialPOLineInfo from '../../SerialPOLineInfo';
import { urls } from '../../utils';

const propTypes = {
  serial: PropTypes.object,
  id: PropTypes.string,
};

const SerialPOLine = ({ serial, id }) => {
  return (
    <Accordion
      id={id}
      label={<FormattedMessage id="ui-serials-management.poLine" />}
    >
      <Card
        cardStyle="positive"
        headerStart={
          <AppIcon app="orders" size="small">
            <Link to={urls.poLineView(serial?.orderLine?.remoteId)}>
              <strong>
                <FormattedMessage id="ui-serials-management.poLine" />
                {': ' + serial?.orderLine?.remoteId_object?.poLineNumber}
              </strong>
            </Link>
          </AppIcon>
        }
        id={id}
        roundedBorder
      >
        <Row>
          <Col xs={serial?.orderLine?.remoteId_object?.publisher ? 6 : 12}>
            <KeyValue
              label={
                <FormattedMessage id="ui-serials-management.poLine.title" />
              }
              value={serial?.orderLine?.remoteId_object?.titleOrPackage}
            />
            {!!serial?.orderLine?.remoteId_object?.instanceId && (
              <AppIcon app="inventory" iconKey="instance" size="small">
                <Link
                  to={urls.inventoryView(
                    serial?.orderLine?.remoteId_object?.instanceId
                  )}
                >
                  <FormattedMessage id="ui-serials-management.poLine.viewInInventory" />
                </Link>
              </AppIcon>
            )}
          </Col>
          {serial?.orderLine?.remoteId_object?.publisher && (
            <Col xs={6}>
              <KeyValue
                label={
                  <FormattedMessage id="ui-serials-management.poLine.publisher" />
                }
                value={serial.orderLine.remoteId_object.publisher}
              />
            </Col>
          )}
        </Row>
        {/* This conditional is a bit tacky, possible a better way of implementing this */}
        {!!serial?.orderLine?.remoteId_object?.instanceId && <br />}
        <SerialPOLineInfo orderLine={serial?.orderLine?.remoteId_object} />
      </Card>
    </Accordion>
  );
};

SerialPOLine.propTypes = propTypes;

export default SerialPOLine;
