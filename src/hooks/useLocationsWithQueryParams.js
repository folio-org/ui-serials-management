
import { useOkapiKy } from '@folio/stripes/core';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

import {
  LOCATIONS_API,
  CONSORTIUM_LOCATIONS_API,
} from '@folio/stripes-acq-components';

const useLocationsWithQueryParams = (queryParams, { consortium = false, options = {} } = {}) => {
  const ky = useOkapiKy();
  const { enabled = true } = options;
  const transformedQueryParams = useMemo(() => {
    const params = [];
    if (queryParams?.query) {
      params.push(consortium ? `filter=${queryParams.query}` : `query=${queryParams.query}`);
    }
    params.push(`limit=${queryParams?.limit || 1000}`); // Default limit is 100
    return params.join('&');
  }, [queryParams, consortium]);

  const fetchLocations = async () => {
    const endpoint = consortium ? CONSORTIUM_LOCATIONS_API : LOCATIONS_API;
    const response = await ky.get(`${endpoint}?${transformedQueryParams}`);
    return response.json();
  };

  const { data: locationsData = [], error, isLoading } = useQuery(
    ['ui-serials-management', consortium ? CONSORTIUM_LOCATIONS_API : LOCATIONS_API, transformedQueryParams],
    fetchLocations,
    { enabled }
  );

  return {
    locations: locationsData?.locations || [],
    error,
    isLoading,
  };
};

export default useLocationsWithQueryParams;
