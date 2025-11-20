import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  KeyValue,
  Row,
  Label,
  InfoPopover,
} from '@folio/stripes/components';

const propTypes = {
  ruleset: PropTypes.object,
};

const PublicationCycleInfo = ({ ruleset }) => (
  <>
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
              id={`ui-serials-management.ruleset.numberOfTimeUnit.${ruleset?.recurrence?.timeUnit?.value}`}
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

PublicationCycleInfo.propTypes = propTypes;

export default PublicationCycleInfo;
