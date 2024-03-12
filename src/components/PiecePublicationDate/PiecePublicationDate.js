import PropTypes from 'prop-types';
import { FormattedMessage, FormattedDate } from 'react-intl';

import { InfoBox } from '@folio/stripes-erm-components';

const propTypes = {
  piece: PropTypes.object,
};

const PiecePublicationDate = ({ piece }) => {
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

PiecePublicationDate.propTypes = propTypes;

export default PiecePublicationDate;
