import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import {
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';

import { urls } from '../../utils';

const proptypes = {
  serial: PropTypes.object,
  ruleset: PropTypes.object,
};

const RulesetInfo = ({ serial, ruleset }) => {
  return (
    <>
      <Row start="xs">
        <Col xs={12}>
          <KeyValue
            label={
              <FormattedMessage id="ui-serials-management.ruleset.parentSerial" />
            }
            value={
              <Link to={urls.serialView(serial?.id)}>
                {serial?.orderLine?.title ?? serial?.id}
              </Link>
            }
          />
        </Col>
      </Row>
      <Row start="xs">
        <Col xs={12}>
          <KeyValue
            label={
              <FormattedMessage id="ui-serials-management.ruleset.patternDescription" />
            }
            value={ruleset?.description}
          />
        </Col>
      </Row>
      <Row start="xs">
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-serials-management.status" />}
            value={ruleset?.rulesetStatus?.label}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={
              <FormattedMessage id="ui-serials-management.ruleset.patternId" />
            }
            value={ruleset?.rulesetNumber}
          />
        </Col>
      </Row>
    </>
  );
};

RulesetInfo.propTypes = proptypes;

export default RulesetInfo;
