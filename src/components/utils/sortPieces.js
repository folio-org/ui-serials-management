import { INTERNAL_COMBINATION_PIECE } from '../../constants/internalPieceClasses';

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
    .sort((a, b) => {
      // Sort all pieces by date or by the recurrence pieces of a combination piece
      return (a?.class === INTERNAL_COMBINATION_PIECE
        ? a?.recurrencePieces[0]?.date
        : a?.date) <
        (b?.class === INTERNAL_COMBINATION_PIECE
          ? b?.recurrencePieces[0]?.date
          : b?.date)
        ? -1
        : 1;
    });
};

export default sortPieces;
