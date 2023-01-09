import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { ORDERS_ENDPOINT } from '../constants/endpoints';

export const useOrders = (orderId) => {
  const ky = useOkapiKy();

  const { isLoading, data = {} } = useQuery(
    ['ui-serials-management', ORDERS_ENDPOINT, orderId],
    () => ky.get(`${ORDERS_ENDPOINT}/${orderId}`).json(),
    { enabled: !!orderId }
  );

  return {
    isLoading,
    data,
  };
};

export default useOrders;
