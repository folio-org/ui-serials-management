import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { VENDOR_ENDPOINT } from '../constants/endpoints';

export const useVendor = (vendorId) => {
  const ky = useOkapiKy();

  const { isFetching, data = {} } = useQuery(
    ['ui-serials-management', VENDOR_ENDPOINT, vendorId],
    () => ky.get(`${VENDOR_ENDPOINT}/${vendorId}`).json(),
    { enabled: !!vendorId }
  );

  return {
    isFetching,
    data,
  };
};

export default useVendor;
