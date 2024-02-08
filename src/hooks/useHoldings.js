import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { HOLDINGS_ENDPOINT } from '../constants/endpoints';

export const useHoldings = (holdingIds) => {
  const ky = useOkapiKy();

  const queryString =
    'id==(' + holdingIds?.map((e) => `"${e}"`).join(' or ') + ')';

  // Using query string within query keys to ensure it is fired when locationIds are changed
  // May be a better alternative for locationIds specified query keys

  const { isLoading, data = [] } = useQuery(
    ['ui-serials-management', HOLDINGS_ENDPOINT, queryString],
    () => ky.get(`${HOLDINGS_ENDPOINT}?query=${queryString}`).json(),
    { enabled: !!holdingIds?.length }
  );

  return {
    isLoading,
    data: data?.holdingsRecords,
  };
};

export default useHoldings;
