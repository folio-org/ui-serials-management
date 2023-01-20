import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { ACQUISITIONS_UNITS_API } from '../constants/endpoints';

export const useAcqUnits = (acqUnitIds) => {
  const ky = useOkapiKy();

  const queryString =
    'id==(' + acqUnitIds?.map((e) => `"${e}"`).join(' or ') + ')';

  // Using query string within query keys to ensure it is fired when acqUnits are changed
  // May be a better alternative for acqUnitIds specified query keys

  const { isLoading, data = [] } = useQuery(
    ['ui-serials-management', ACQUISITIONS_UNITS_API, queryString],
    () => ky.get(`${ACQUISITIONS_UNITS_API}?query=${queryString}`).json(),
    { enabled: !!acqUnitIds?.length }
  );

  return {
    isLoading,
    data: data?.acquisitionsUnits,
  };
};

export default useAcqUnits;
