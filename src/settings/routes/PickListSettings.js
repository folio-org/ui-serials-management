import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { EditableRefdataCategoryList } from '@k-int/stripes-kint-components';

import { useStripes } from '@folio/stripes/core';
import { Pane } from '@folio/stripes/components';

import { REFDATA_ENDPOINT } from '../../constants/endpoints';

const PickListSettings = () => {
  const history = useHistory();
  const stripes = useStripes();
  const perm = stripes.hasPerm('ui-serials-management.picklists.manage');
  const displayConditions = {
    create: perm,
    delete: perm,
    edit: perm,
  };

  return (
    <Pane
      defaultWidth="fill"
      dismissible
      id="edit-refdata-desc"
      onClose={() => history.push('/settings/serials-management')}
      paneTitle={
        <FormattedMessage id="ui-serials-management.settings.refdata.pickLists" />
      }
    >
      <EditableRefdataCategoryList
        displayConditions={displayConditions}
        label={
          <FormattedMessage id="ui-serials-management.settings.refdata.pickLists" />
        }
        refdataEndpoint={REFDATA_ENDPOINT}
      />
    </Pane>
  );
};

export default PickListSettings;
