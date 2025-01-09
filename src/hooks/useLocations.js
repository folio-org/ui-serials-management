import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import {
  LOCATIONS_API,
  CONSORTIUM_LOCATIONS_API,
} from '@folio/stripes-acq-components';

export const useLocations = ({
  consortium = false,
  options = {},
} = {}) => {
  const { enabled = true } = options;
  const ky = useOkapiKy();

  const locationsEndpoint = consortium
    ? CONSORTIUM_LOCATIONS_API
    : LOCATIONS_API;

  const { isLoading, data = [] } = useQuery(
    ['ui-serials-management', locationsEndpoint],
    () => ky.get(`${locationsEndpoint}`).json(),
    { enabled }
  );

  return {
    isLoading,
    data: data?.locations,
  };
};

export default useLocations;
