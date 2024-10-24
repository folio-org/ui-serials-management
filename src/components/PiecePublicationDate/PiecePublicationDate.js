import PropTypes from 'prop-types';
import { FormattedMessage, FormattedDate } from 'react-intl';

import { InfoBox } from '@folio/stripes-erm-components';
import {
  INTERNAL_COMBINATION_PIECE,
  INTERNAL_OMISSION_PIECE,
  INTERNAL_RECURRENCE_PIECE,
} from '../../constants/internalPieceClasses';

const propTypes = {
  piece: PropTypes.object,
};

const PiecePublicationDate = ({ piece }) => {
  switch (piece?.class) {
    case INTERNAL_RECURRENCE_PIECE:
      return <FormattedDate value={piece?.date} />;
    case INTERNAL_OMISSION_PIECE:
      return (
        <>
          <FormattedDate value={piece?.date} />
          {piece?.class === INTERNAL_OMISSION_PIECE && (
            <InfoBox type="success">
              <FormattedMessage id="ui-serials-management.pieceSets.omitted" />
            </InfoBox>
          )}
        </>
      );
    case INTERNAL_COMBINATION_PIECE:
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
    default:
      return null;
  }
};

PiecePublicationDate.propTypes = propTypes;

export default PiecePublicationDate;
