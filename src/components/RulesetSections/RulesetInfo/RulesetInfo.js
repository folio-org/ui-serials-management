import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import {
  Col,
  KeyValue,
  Row,
  Label,
  InfoPopover,
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
                {serial?.title ?? serial?.id}
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

      <Row>
        <Col xs={6}>
          <Label tagName="h4">
            <FormattedMessage id="ui-serials-management.ruleset.publicationCycle" />
            <InfoPopover
              content={
                <FormattedMessage id="ui-serials-management.ruleset.cycleLengthPopover" />
              }
            />
          </Label>
        </Col>
      </Row>
      <Row start="xs">
        <Col xs={3}>
          <KeyValue
            label={
              <FormattedMessage id="ui-serials-management.ruleset.timeUnit" />
            }
            value={ruleset?.recurrence?.timeUnit?.label}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={
              <FormattedMessage
                id="ui-serials-management.ruleset.numberOfTimeUnit"
                values={{
                  timeUnit: ruleset?.recurrence?.timeUnit?.value,
                }}
              />
            }
            value={ruleset?.recurrence?.period}
          />
        </Col>
        <Col xs={4}>
          <KeyValue
            label={
              <FormattedMessage id="ui-serials-management.ruleset.numberOfIssuesPerCycle" />
            }
            value={ruleset?.recurrence?.issues}
          />
        </Col>
      </Row>
    </>
  );
};

RulesetInfo.propTypes = proptypes;

export default RulesetInfo;
