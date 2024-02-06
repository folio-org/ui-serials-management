import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { HOLDINGS_ENDPOINT } from '../constants/endpoints';

export const useHoldings = () => {
  const ky = useOkapiKy();

  const { isLoading, data = {} } = useQuery(
    ['ui-serials-management', HOLDINGS_ENDPOINT],
    () => ky.get(`${HOLDINGS_ENDPOINT}`).json(),
  );

  return {
    isLoading,
    data,
  };
};

export default useHoldings;
