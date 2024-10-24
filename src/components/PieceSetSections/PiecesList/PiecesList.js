import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Row, Col, MultiColumnList } from '@folio/stripes/components';

import { INTERNAL_OMISSION_PIECE } from '../../../constants/internalPieceClasses';

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
      return e?.class === INTERNAL_OMISSION_PIECE ? '-' : e.rowIndex + 1;
    },
    publicationDate: (e) => renderPublicationDate(e),
    displaySummary: (e) => {
      return e?.label;
    },
    receivingPieces: (e) => e?.receivingPieces?.length,
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
              receivingPieces: (
                <FormattedMessage id="ui-serials-management.pieceSets.receivingPieces" />
              ),
            }}
            columnWidths={{
              publicationDate: { min: 100, max: 165 },
            }}
            contentData={pieceSet?.pieces}
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
