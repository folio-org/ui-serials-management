import PropTypes from 'prop-types';
import { FormattedMessage, FormattedDate } from 'react-intl';

import { InfoBox } from '@folio/stripes-erm-components';
import {
  INTERNAL_COMBINATION_PIECE,
  INTERNAL_OMISSION_PIECE,
} from '../../constants/internalPieceClasses';

const propTypes = {
  piece: PropTypes.object,
};

const PiecePublicationDate = ({ piece }) => {
  if (piece?.class === INTERNAL_COMBINATION_PIECE) {
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
        {piece?.class === INTERNAL_OMISSION_PIECE && (
          <InfoBox type="success">
            <FormattedMessage id="ui-serials-management.pieceSets.omitted" />
          </InfoBox>
        )}
      </>
    );
  }
};

PiecePublicationDate.propTypes = propTypes;

export default PiecePublicationDate;
