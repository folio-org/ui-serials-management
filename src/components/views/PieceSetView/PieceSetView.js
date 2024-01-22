import PropTypes from 'prop-types';

import {
  Pane,
  LoadingPane,
} from '@folio/stripes/components';

import { DEFAULT_VIEW_PANE_WIDTH } from '../../../constants/config';
import PieceSetInfo from '../../PieceSetSections';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  resource: PropTypes.object,
  queryProps: PropTypes.object,
};

const PieceSetView = ({
  resource: pieceSet,
  onClose,
  queryProps: { isLoading },
}) => {
  const getSectionProps = (name) => {
    return {
      id: `piece-set-section-${name}`,
      pieceSet,
    };
  };

  if (isLoading) {
    return <LoadingPane dismissible onClose={onClose} />;
  }

  return (
    <Pane defaultWidth={DEFAULT_VIEW_PANE_WIDTH} dismissible onClose={onClose}>
      <PieceSetInfo {...getSectionProps('info')} />
    </Pane>
  );
};

PieceSetView.propTypes = propTypes;

export default PieceSetView;
