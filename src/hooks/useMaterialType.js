import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { MATERIAL_TYPE_ENDPOINT } from '../constants/endpoints';

export const useMaterialType = (materialTypeId) => {
  const ky = useOkapiKy();

  const { isLoading, data = {} } = useQuery(
    ['ui-serials-management', MATERIAL_TYPE_ENDPOINT, materialTypeId],
    () => ky.get(`${MATERIAL_TYPE_ENDPOINT}/${materialTypeId}`).json(),
    { enabled: !!materialTypeId }
  );

  return {
    isLoading,
    data,
  };
};

export default useMaterialType;
