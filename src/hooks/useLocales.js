import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { LOCALES_ENDPOINT } from '../constants/endpoints';

export const useLocales = () => {
  const ky = useOkapiKy();

  const { isLoading, data = [] } = useQuery(
    ['ui-serials-management', LOCALES_ENDPOINT],
    () => ky.get(`${LOCALES_ENDPOINT}`).json(),
  );

  return {
    isLoading,
    data,
  };
};

export default useLocales;
