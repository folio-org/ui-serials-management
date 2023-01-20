import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { IDENTIFIER_TYPES_ENDPOINT } from '../constants/endpoints';

export const useIdentifierTypes = (identifierTypeIds) => {
  const ky = useOkapiKy();

  const uniqueIdsArray = [...new Set(identifierTypeIds)];

  const queryString =
    'id==(' + uniqueIdsArray?.map((e) => `"${e}"`).join(' or ') + ')';

  // Using query string within query keys to ensure it is fired when acqUnits are changed
  // May be a better alternative for acqUnitIds specified query keys

  const { isLoading, data = [] } = useQuery(
    ['ui-serials-management', IDENTIFIER_TYPES_ENDPOINT, queryString],
    () => ky.get(`${IDENTIFIER_TYPES_ENDPOINT}?query=${queryString}`).json(),
    { enabled: !!identifierTypeIds?.length }
  );

  return {
    isLoading,
    data: data?.identifierTypes || [],
  };
};

export default useIdentifierTypes;
