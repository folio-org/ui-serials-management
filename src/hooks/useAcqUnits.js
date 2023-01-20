import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import { ACQUISITIONS_UNITS_API } from '../constants/endpoints';

export const useAcqUnits = (acqUnitIds) => {
  const ky = useOkapiKy();

  const queryString =
    'id==(' + acqUnitIds?.map((e) => `"${e}"`).join(' or ') + ')';

  const { isLoading, data = [] } = useQuery(
    ['ui-serials-management', ACQUISITIONS_UNITS_API],
    () => ky.get(`${ACQUISITIONS_UNITS_API}?query=${queryString}`).json(),
    { enabled: !!acqUnitIds?.length }
  );

  return {
    isLoading,
    data: data?.acquisitionsUnits,
  };
};

export default useAcqUnits;
