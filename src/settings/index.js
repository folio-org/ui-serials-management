import React from 'react';
import PropTypes from 'prop-types';

import { useSettings } from '@k-int/stripes-kint-components';

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
  const persistentPages = [];

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
