import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage, FormattedDate } from 'react-intl';

import { Row, Col, KeyValue } from '@folio/stripes/components';
import { FormattedDateTime } from '@folio/stripes-erm-components';

import { urls } from '../../utils';

const propTypes = {
  pieceSet: PropTypes.object,
  id: PropTypes.string,
};

const PieceSetInfo = ({ pieceSet, id }) => {
  return (
    <div id={id}>
      <Row>
        <Col xs={12}>
          <KeyValue
            label={
              <FormattedMessage id="ui-serials-management.serials.serial" />
            }
          >
            <Link to={urls.serialView(pieceSet?.ruleset?.owner?.id)}>
              {pieceSet?.title ? (
                <>{pieceSet?.title}</>
              ) : (
                <>{pieceSet?.ruleset?.owner?.id}</>
              )}
            </Link>
          </KeyValue>
        </Col>
      </Row>
      <Row start="xs">
        <Col xs={3}>
          <KeyValue
            label={
              <FormattedMessage id="ui-serials-management.pieceSets.dateGenerated" />
            }
          >
            <FormattedDateTime
              date={pieceSet?.dateCreated}
              id="piece=sets-date-generated"
            />
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue
            label={
              <FormattedMessage id="ui-serials-management.pieceSets.startDate" />
            }
          >
            <FormattedDate timeZone="UTC" value={pieceSet?.startDate} />
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
      {pieceSet?.titleId && (
        <Row start="xs">
          <Col xs={12}>
            <KeyValue
              label={
                <FormattedMessage id="ui-serials-management.serials.titleInReceiving" />
              }
              value={
                <Link to={urls.receivingView(pieceSet.titleId)}>
                  {pieceSet?.title}
                </Link>
              }
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

PieceSetInfo.propTypes = propTypes;

export default PieceSetInfo;
