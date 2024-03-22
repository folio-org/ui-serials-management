import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { Pane, Select } from '@folio/stripes/components';
import { EditableRefdataList } from '@k-int/stripes-kint-components';
import { useSerialsManagementRefdata } from '../../components/utils';
import { REFDATA_ENDPOINT } from '../../constants/endpoints';

const PickListValues = () => {
  // We should probably be following the example of agreements/licenses for v2, 
  // using a combined screen lookup
  const rdcOptions = useSerialsManagementRefdata()?.map((rdc) => ({
    value: rdc.desc,
    label: rdc.desc,
  }));

  const [selectedPickList, setSelectedPickList] = useState('');
  const history = useHistory();

  return (
    <Pane
      defaultWidth="fill"
      dismissible
      id="edit-refdata"
      onClose={() => history.push('/settings/serials-management')}
      paneTitle={
        <FormattedMessage id="ui-serials-management.settings.refdata.picklistValues" />
      }
    >
      <Select
        dataOptions={[{ value: '', label: '' }, ...rdcOptions]}
        label={<FormattedMessage id="ui-serials-management.settings.refdata.picklist" />}
        onChange={(e) => setSelectedPickList(e.target.value)}
        value={selectedPickList}
      />
      {selectedPickList && (
        <EditableRefdataList
          desc={selectedPickList}
          label={
            <FormattedMessage id="ui-serials-management.settings.refdata.picklistValues" />
          }
          refdataEndpoint={REFDATA_ENDPOINT}
        />
      )}
    </Pane>
  );
};

export default PickListValues;
