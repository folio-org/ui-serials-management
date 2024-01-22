import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Button } from '@folio/stripes/components';

import { ResponsiveButtonGroup } from '@k-int/stripes-kint-components';

import { urls } from '../../utils';

const propTypes = {
  primary: PropTypes.string,
};

const RouteSwitcher = ({ primary }) => {
  let selectedIndex;

  switch (primary) {
    case 'serials':
      selectedIndex = 0;
      break;
    case 'predictedPieces':
      selectedIndex = 1;
      break;
    case 'patterns':
      selectedIndex = 2;
      break;
    default:
      break;
  }

  return (
    <ResponsiveButtonGroup fullWidth selectedIndex={selectedIndex}>
      <Button
        key="clickable-nav-serials"
        id="clickable-nav-serials"
        to={primary === 'serials' ? null : urls.serials()}
      >
        <FormattedMessage id="ui-serials-management.serials" />
      </Button>
      <Button
        key="clickable-nav-predicted-pieces"
        id="clickable-nav-predicted-pieces"
        to={primary === 'predictedPieces' ? null : urls.predictedPieces()}
      >
        <FormattedMessage id="ui-serials-management.predictedPieces" />
      </Button>
      <Button
        key="clickable-nav-patterns"
        id="clickable-nav-patterns"
        to={primary === 'patterns' ? null : urls.patterns()}
      >
        <FormattedMessage id="ui-serials-management.patterns" />
      </Button>
    </ResponsiveButtonGroup>
  );
};

RouteSwitcher.propTypes = propTypes;

export default RouteSwitcher;
