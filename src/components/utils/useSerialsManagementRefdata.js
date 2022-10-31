import orderBy from 'lodash/orderBy';
import { useRefdata, refdataOptions } from '@k-int/stripes-kint-components';

import { REFDATA_ENDPOINT } from '../../constants/endpoints';

const useSerialsManagementRefdata = (desc) => {
  const refdata = useRefdata({
    desc,
    endpoint: REFDATA_ENDPOINT,
    options: { ...refdataOptions, sort: [{ path: 'desc' }] },
  });

  const sortedRefData = [...refdata];

  // This may want to be refactored later without the reliance on orderBy
  // If the refdata reteched is in an array, sort the values
  if (Array.isArray(refdata)) {
    for (let index = 0; index < refdata.length; index++) {
      // Order the refdata values in ascending order i.e Author, DFG, Library
      sortedRefData[index].values = orderBy(
        refdata[index].values,
        'value',
        'asc'
      );
    }
  }

  if (Array.isArray(desc)) {
    // We're fetching a set of refdataValues, return them with all information
    return sortedRefData;
  }

  if (desc) {
    // Otherwise we're fetching a single set of values, so return just the values;
    const { 0: { values = [] } = {} } = sortedRefData;
    return values;
  } else {
    return sortedRefData;
  }
};

export default useSerialsManagementRefdata;
