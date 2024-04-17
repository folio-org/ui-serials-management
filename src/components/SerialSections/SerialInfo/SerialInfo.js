import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { Row, Col, KeyValue } from '@folio/stripes/components';
import { urls } from '../../utils';

const propTypes = {
  serial: PropTypes.object,
  id: PropTypes.string,
};

const SerialInfo = ({ serial, id }) => {
  return (
    <div id={id}>
      <Row start="xs">
        <Col xs={3}>
          <KeyValue
            label={
              <FormattedMessage id="ui-serials-management.serials.status" />
            }
            value={serial?.serialStatus?.label}
          />
        </Col>
        <Col xs={9}>
          <KeyValue
            label={
              <FormattedMessage id="ui-serials-management.serials.description" />
            }
            value={serial?.description}
          />
        </Col>
      </Row>
      {serial?.orderLine?.titleId &&
        <Row start="xs">
          <Col xs={12}>
            <KeyValue
              label={
                <FormattedMessage id="ui-serials-management.serials.titleInReceiving" />
              }
              value={
                <Link to={urls.receivingView(serial.orderLine.titleId)}>
                  {serial?.orderLine?.title}
                </Link>
              }
            />
          </Col>
        </Row>
      }
    </div>
  );
};

SerialInfo.propTypes = propTypes;

export default SerialInfo;
