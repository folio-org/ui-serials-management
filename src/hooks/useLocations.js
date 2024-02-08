import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { LOCATIONS_ENDPOINT } from '../constants/endpoints';

export const useLocations = () => {
  const ky = useOkapiKy();

  const { isLoading, data = [] } = useQuery(
    ['ui-serials-management', LOCATIONS_ENDPOINT],
    () => ky.get(`${LOCATIONS_ENDPOINT}`).json(),
  );

  return {
    isLoading,
    data: data?.locations,
  };
};

export default useLocations;
