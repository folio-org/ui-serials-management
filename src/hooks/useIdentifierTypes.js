import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { IDENTIFIER_TYPES_ENDPOINT } from '../constants/endpoints';

export const useIdentifierTypes = (identifierTypeIds) => {
  const ky = useOkapiKy();

  const queryString =
    'id==(' + identifierTypeIds?.map((e) => `"${e}"`).join(' or ') + ')';

  const { isLoading, data = [] } = useQuery(
    ['ui-serials-management', IDENTIFIER_TYPES_ENDPOINT],
    () => ky.get(`${IDENTIFIER_TYPES_ENDPOINT}?query=${queryString}`).json(),
    { enabled: !!identifierTypeIds }
  );

  return {
    isLoading,
    data: data?.identifierTypes,
  };
};

export default useIdentifierTypes;
