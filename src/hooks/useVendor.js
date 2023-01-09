import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { VENDOR_ENDPOINT } from '../constants/endpoints';

export const useVendor = (vendorId) => {
  const ky = useOkapiKy();

  const { isLoading, data = {} } = useQuery(
    ['ui-serials-management', VENDOR_ENDPOINT, vendorId],
    () => ky.get(`${VENDOR_ENDPOINT}/${vendorId}`).json(),
    { enabled: !!vendorId }
  );

  return {
    isLoading,
    data,
  };
};

export default useVendor;
