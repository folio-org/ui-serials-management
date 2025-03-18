import { INTERNAL_COMBINATION_PIECE } from '../../constants/internalPieceClasses';

const comparePieces = (a, b) => {
  const parseDate = (piece) => {
    return piece?.class === INTERNAL_COMBINATION_PIECE
      ? piece?.recurrencePieces[0]?.date
      : piece?.date;
  };
  // Sort all pieces by date or by the recurrence pieces of a combination piece);
  return parseDate(a) < parseDate(b) ? -1 : 1;
};

// Used to sort pieces by date and combination pieces by their recurrence pieces date
const sortPieces = (pieces) => {
  // Itereate through the pieces and find combination pieces
  return pieces
    ?.map((p) => {
      return p?.class === INTERNAL_COMBINATION_PIECE
        ? {
          ...p,
          // Sort combination piece's recurrence pieces by date
          recurrencePieces: p?.recurrencePieces?.sort((a, b) => (a?.date < b?.date ? -1 : 1)),
        }
        : p;
    })
    .sort((a, b) => comparePieces(a, b));
};

export default sortPieces;
