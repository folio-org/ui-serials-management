/* eslint-disable react/style-prop-object */
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Accordion, Col, Row } from '@folio/stripes/components';

const proptypes = {
  ruleset: PropTypes.object,
};

const DisplaySummaryTemplate = ({ ruleset }) => {
  return (
    <Accordion
      label={
        <FormattedMessage id="ui-serials-management.ruleset.displaySummaryTemplate" />
      }
    >
      <Row>
        <Col xs={12}>{ruleset?.templateConfig?.templateString}</Col>
      </Row>
    </Accordion>
  );
};

DisplaySummaryTemplate.propTypes = proptypes;

export default DisplaySummaryTemplate;
