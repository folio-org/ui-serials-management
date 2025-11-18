import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  KeyValue,
  Row,
  Label,
  InfoPopover,
} from '@folio/stripes/components';


const proptypes = {
  template: PropTypes.object,
  ruleset: PropTypes.object,
};

const TemplateInfo = ({ template, ruleset }) => {
  return (
    <>
      <Row start="xs">
        <Col xs={12}>
          <KeyValue
            label={
              <FormattedMessage id="ui-serials-management.status" />
            }
            value={template?.modelRulesetStatus?.label}
          />
        </Col>
      </Row>
      <Row start="xs">
        <Col xs={6}>
          <KeyValue
            label={
              <FormattedMessage id="ui-serials-management.templates.description" />
            }
            value={template?.description}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={
              <FormattedMessage id="ui-serials-management.templates.exampleLabel" />
            }
            value={template?.exampleLabel}
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
};

TemplateInfo.propTypes = proptypes;

export default TemplateInfo;
