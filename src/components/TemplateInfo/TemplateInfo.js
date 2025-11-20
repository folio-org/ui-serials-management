import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';


const proptypes = {
  template: PropTypes.object,
};

const TemplateInfo = ({ template }) => {
  return (
    <>
      <Row start="xs">
        <Col xs={12}>
          <KeyValue
            label={
              <FormattedMessage id="ui-serials-management.templates.status" />
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
    </>
  );
};

TemplateInfo.propTypes = proptypes;

export default TemplateInfo;
