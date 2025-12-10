import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { IfPermission } from '@folio/stripes/core';
import { Button } from '@folio/stripes/components';

import { ResponsiveButtonGroup } from '@k-int/stripes-kint-components';

import { urls } from '../../utils';

const propTypes = {
  primary: PropTypes.string,
};

const RouteSwitcher = ({ primary }) => {
  let selectedIndex;
  // istanbul ignore next
  switch (primary) {
    case 'serials':
      selectedIndex = 0;
      break;
    case 'pieceSets':
      selectedIndex = 1;
      break;
    case 'templates':
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
        key="clickable-nav-piece-sets"
        id="clickable-nav-piece-sets"
        to={primary === 'pieceSets' ? null : urls.pieceSets()}
      >
        <FormattedMessage id="ui-serials-management.pieceSets" />
      </Button>
      <IfPermission perm="serials-management.rulesets.view">
        <Button
          key="clickable-nav-templates"
          id="clickable-nav-templates"
          to={primary === 'templates' ? null : urls.templates()}
        >
          <FormattedMessage id="ui-serials-management.templates" />
        </Button>
      </IfPermission>
    </ResponsiveButtonGroup>
  );
};

RouteSwitcher.propTypes = propTypes;

export default RouteSwitcher;
