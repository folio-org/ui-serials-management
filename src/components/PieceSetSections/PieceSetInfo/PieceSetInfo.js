import PropTypes from 'prop-types';
import { FormattedMessage, FormattedDate } from 'react-intl';

import { Row, Col, KeyValue } from '@folio/stripes/components';
import { FormattedDateTime } from '@folio/stripes-erm-components';

const propTypes = {
  pieceSet: PropTypes.object,
  id: PropTypes.string,
};

const PieceSetInfo = ({ pieceSet, id }) => {
  return (
    <div id={id}>
      <Row start="xs">
        <Col xs={3}>
          <KeyValue
            label={
              <FormattedMessage id="ui-serials-management.pieceSets.dateGenerated" />
            }
          >
            <FormattedDateTime date={pieceSet?.dateCreated} />
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue
            label={
              <FormattedMessage id="ui-serials-management.pieceSets.startDate" />
            }
          >
            <FormattedDate value={pieceSet?.startDate} />
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue
            label={
              <FormattedMessage id="ui-serials-management.pieceSets.totalPieces" />
            }
          >
            {pieceSet?.pieces?.length}
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue
            label={
              <FormattedMessage id="ui-serials-management.pieceSets.patternId" />
            }
          >
            {pieceSet?.ruleset?.rulesetNumber}
          </KeyValue>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <KeyValue
            label={
              <FormattedMessage id="ui-serials-management.pieceSets.note" />
            }
          >
            {pieceSet?.note}
          </KeyValue>
        </Col>
      </Row>
    </div>
  );
};

PieceSetInfo.propTypes = propTypes;

export default PieceSetInfo;
