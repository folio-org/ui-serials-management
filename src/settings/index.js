import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { useSettings } from '@k-int/stripes-kint-components';

import PickListValues from './routes';
import { REFDATA_ENDPOINT, SETTINGS_ENDPOINT } from '../constants/endpoints';

const propTypes = {
  resources: PropTypes.shape({
    settings: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

const SerialsManagementSettings = (props) => {
  const intl = useIntl();
  const persistentPages = [];

  persistentPages.push({
    component: PickListValues,
    label: intl.formatMessage({ id: 'ui-serials-management.settings.refdata.picklistValues' }),
    route: 'pick-list-values',
  });

  const { isLoading, SettingsComponent } = useSettings({
    dynamicPageExclusions: [],
    intlKey: 'ui-serials-management',
    persistentPages,
    refdataEndpoint: REFDATA_ENDPOINT,
    settingEndpoint: SETTINGS_ENDPOINT,
  });

  if (isLoading) {
    return null;
  }

  return <SettingsComponent {...props} />;
};

SerialsManagementSettings.propTypes = propTypes;

export default SerialsManagementSettings;
