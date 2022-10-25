import { Button, ButtonGroup } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';
import urls from '../../utils';

const HeaderComponent = () => {
  const { pathname } = useLocation();

  return (
    <ButtonGroup fullWidth>
      <Button
        buttonStyle={
          pathname?.startsWith('/serials-management/serials')
            ? 'primary'
            : 'default'
        }
        id="clickable-nav-serials"
        to={
          pathname?.startsWith('/serials-management/serials')
            ? null
            : urls.serials()
        }
      >
        <FormattedMessage id="ui-serials-management.serials" />
      </Button>
      <Button
        buttonStyle={
          pathname?.startsWith('/serials-management/expectedPieces')
            ? 'primary'
            : 'default'
        }
        id="clickable-nav-expected-pieces"
        to={
          pathname?.startsWith('/serials-management/expectedPieces')
            ? null
            : urls.expectedPieces()
        }
      >
        <FormattedMessage id="ui-serials-management.expectedPieces" />
      </Button>
      <Button
        buttonStyle={
          pathname?.startsWith('/serials-management/patterns')
            ? 'primary'
            : 'default'
        }
        id="clickable-nav-patterns"
        to={
          pathname?.startsWith('/serials-management/patterns')
            ? null
            : urls.patterns()
        }
      >
        <FormattedMessage id="ui-serials-management.patterns" />
      </Button>
    </ButtonGroup>
  );
};

export default HeaderComponent;
