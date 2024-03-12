import PropTypes from 'prop-types';
import { FormattedMessage, FormattedDate } from 'react-intl';

import { Row, Col, MultiColumnList } from '@folio/stripes/components';
import { InfoBox } from '@folio/stripes-erm-components';

const propTypes = {
  pieceSet: PropTypes.object,
  id: PropTypes.string,
};

const PiecesList = ({ pieceSet, id }) => {
  const renderPublicationDate = (piece) => {
    if (piece?.recurrencePieces) {
      return (
        <>
          <FormattedDate value={piece?.recurrencePieces[0].date} />
          <br />
          <FormattedMessage
            id="ui-serials-management.pieceSets.combinedPieces"
            values={{ length: piece?.recurrencePieces.length }}
          />
        </>
      );
    } else {
      return (
        <>
          <FormattedDate value={piece?.date} />
          {piece?.omissionOrigins && (
            <InfoBox type="success">
              <FormattedMessage id="ui-serials-management.pieceSets.omitted" />
            </InfoBox>
          )}
        </>
      );
    }
  };

  const formatter = {
    issueCount: (e) => {
      return e?.omissionOrigins ? '-' : e.rowIndex + 1;
    },
    publicationDate: (e) => renderPublicationDate(e),
    displaySummary: (e) => {
      return e?.label;
    },
    generatedInReceiving: (e) => e?.receivingId
  };

  return (
    <div id={id}>
      <Row start="xs">
        <Col xs={12}>
          <MultiColumnList
            columnMapping={{
              issueCount: (
                <FormattedMessage id="ui-serials-management.pieceSets.issueCount" />
              ),
              publicationDate: (
                <FormattedMessage id="ui-serials-management.pieceSets.publicationDate" />
              ),
              displaySummary: (
                <FormattedMessage id="ui-serials-management.pieceSets.displaySummary" />
              ),
              generatedInReceiving: (
                <FormattedMessage id="ui-serials-management.pieceSets.generatedInReceiving" />
              ),
            }}
            columnWidths={{
              publicationDate: { min: 100, max: 165 },
            }}
            contentData={pieceSet?.pieces.sort((a, b) => (a?.date < b?.date ? -1 : 1))}
            formatter={formatter}
            interactive={false}
            visibleColumns={[
              'issueCount',
              'publicationDate',
              'displaySummary',
              'generatedInReceiving',
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};

PiecesList.propTypes = propTypes;

export default PiecesList;
