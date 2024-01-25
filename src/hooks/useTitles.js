import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { TITLES_ENDPOINT } from '../constants/endpoints';

export const useTitles = (orderLineId) => {
  const ky = useOkapiKy();

  const queryString = `poLineId==${orderLineId} sortby title`;

  const { isLoading, data = {} } = useQuery(
    ['ui-serials-management', TITLES_ENDPOINT, orderLineId],
    () => ky.get(`${TITLES_ENDPOINT}?query=${queryString}`).json(),
    { enabled: !!orderLineId }
  );

  return {
    isLoading,
    data,
  };
};

export default useTitles;
