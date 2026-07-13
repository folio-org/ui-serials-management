import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Row, Col, KeyValue, MessageBanner } from '@folio/stripes/components';

import {
  INTERNAL_COMBINATION_PIECE,
  INTERNAL_OMISSION_PIECE,
  INTERNAL_RECURRENCE_PIECE,
} from '../../../constants/internalPieceClasses';
import { urls } from '../../utils';

import css from './GenerateReceivingModalInfo.css';

const propTypes = {
  orderLineLocations: PropTypes.arrayOf(PropTypes.object),
  pieceSet: PropTypes.object,
};

const GenerateReceivingModalInfo = ({ orderLineLocations = [], pieceSet }) => {
  // Format piece information based on class
  const renderPieceDateLabel = (piece) => {
    switch (piece?.class) {
      case INTERNAL_RECURRENCE_PIECE:
        return `${piece?.date}, ${piece?.label}`;
      case INTERNAL_OMISSION_PIECE:
        return `${piece?.date}`;
      case INTERNAL_COMBINATION_PIECE:
        return `${piece?.recurrencePieces[0]?.date}, ${piece?.label}`;
      default:
        return null;
    }
  };

  const hasExistingReceiving = pieceSet?.pieces?.some(
    (p) => p?.receivingPieces?.length >= 1
  );

  return (
    <>
      <MessageBanner>
        <FormattedMessage id="ui-serials-management.pieceSets.generateReceivingInfo" />
      </MessageBanner>
      {hasExistingReceiving && (
        <>
          <MessageBanner type="warning">
            <FormattedMessage
              id="ui-serials-management.pieceSets.receivingPiecesAlreadyExistWarning"
              values={{
                link: pieceSet?.titleId ? (
                  <Link to={urls.receivingView(pieceSet.titleId)}>
                    {pieceSet?.title}
                  </Link>
                ) : (
                  pieceSet?.title
                ),
              }}
            />
          </MessageBanner>
          <br />
        </>
      )}
      {!orderLineLocations?.length && (
        <>
          <MessageBanner type="warning">
            <FormattedMessage id="ui-serials-management.pieceSets.noOrderLineLocationsOrHoldings" />
          </MessageBanner>
          <br />
        </>
      )}
      <div className={css.container}>
        <Row className={css.firstRow}>
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
                <FormattedMessage id="ui-serials-management.pieceSets.pieceSetGenerated" />
              }
            >
              {pieceSet?.dateCreated}
            </KeyValue>
          </Col>
          <Col xs={3}>
            <KeyValue
              label={
                <FormattedMessage id="ui-serials-management.pieceSets.startDate" />
              }
            >
              {pieceSet?.startDate}
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
        <Row className={css.secondRow}>
          <Col xs={3}>
            <KeyValue
              label={
                <FormattedMessage id="ui-serials-management.pieceSets.firstPiece" />
              }
            >
              {renderPieceDateLabel(pieceSet?.pieces[0])}
            </KeyValue>
          </Col>
          <Col xs={3}>
            <KeyValue
              label={
                <FormattedMessage id="ui-serials-management.pieceSets.lastPiece" />
              }
            >
              {renderPieceDateLabel(
                pieceSet?.pieces?.[pieceSet?.pieces?.length - 1]
              )}
            </KeyValue>
          </Col>
        </Row>
      </div>
    </>
  );
};

GenerateReceivingModalInfo.propTypes = propTypes;

export default GenerateReceivingModalInfo;
