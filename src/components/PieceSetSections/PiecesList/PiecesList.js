import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Row, Col, MultiColumnList } from '@folio/stripes/components';

import { INTERNAL_COMBINATION_PIECE } from '../../../constants/internalPieceClasses';

import PiecePublicationDate from '../../PiecePublicationDate';

const propTypes = {
  pieceSet: PropTypes.object,
  id: PropTypes.string,
};

const PiecesList = ({ pieceSet, id }) => {
  const renderPublicationDate = (piece) => {
    return <PiecePublicationDate piece={piece} />;
  };
  /* istanbul ignore next */
  const formatter = {
    issueCount: (e) => {
      return e?.omissionOrigins ? '-' : e.rowIndex + 1;
    },
    publicationDate: (e) => renderPublicationDate(e),
    displaySummary: (e) => {
      return e?.label;
    },
    receivingPieces: (e) => e?.receivingPieces?.length,
  };

  // This is a bit annoying with regard to the sorting that needs to be done
  // Grails doesnt like attempting to sort uniderectional one to many relationships
  const sortedPieces = pieceSet?.pieces
  // Itereate through the pieces and find combination pieces
    ?.map((p) => {
      return p?.class === INTERNAL_COMBINATION_PIECE
        ? {
          ...p,
          // Sort combination piece's recurrence pieces by date
          recurrencePieces: p?.recurrencePieces?.sort((a, b) => (a?.date < b?.date ? -1 : 1)),
        }
        : p;
    })
    .sort((a, b) => {
      // Sort all pieces by date or by the recurrence pieces of a combination piece
      return (a?.class === INTERNAL_COMBINATION_PIECE
        ? a?.recurrencePieces?.[0]?.date
        : a?.date) <
        (b?.class === INTERNAL_COMBINATION_PIECE
          ? b?.recurrencePieces?.[0]?.date
          : b?.date)
        ? -1
        : 1;
    });

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
              receivingPieces: (
                <FormattedMessage id="ui-serials-management.pieceSets.receivingPieces" />
              ),
            }}
            columnWidths={{
              publicationDate: { min: 100, max: 165 },
            }}
            contentData={sortedPieces}
            formatter={formatter}
            interactive={false}
            visibleColumns={[
              'issueCount',
              'publicationDate',
              'displaySummary',
              'receivingPieces',
            ]}
          />
        </Col>
      </Row>
    </div>
  );
};

PiecesList.propTypes = propTypes;

export default PiecesList;
