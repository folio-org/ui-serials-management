import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { useStripes } from '@folio/stripes/core';
import {
  Pane,
  LoadingPane,
  Button,
  Icon,
  MetaSection,
} from '@folio/stripes/components';

import {
  Rulesets,
  SerialInfo,
  SerialPOLine,
} from '../../SerialSections';
import { urls } from '../../utils';
import { DEFAULT_VIEW_PANE_WIDTH } from '../../../constants/config';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  resource: PropTypes.object,
  queryProps: PropTypes.object,
};

const SerialView = ({
  resource: serial,
  onClose,
  queryProps: { isLoading },
}) => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const stripes = useStripes();

  const handleEdit = () => {
    history.push(`${urls.serialEdit(params?.id)}${location.search}`);
  };

  const getSectionProps = (name) => {
    return {
      id: `serial-section-${name}`,
      serial,
    };
  };

  const renderActionMenu = () => {
    const buttons = [];
    if (stripes.hasPerm('serials-management.serials.edit')) {
      buttons.push(
        <Button
          buttonStyle="dropdownItem"
          id="clickable-dropdown-edit-serial"
          onClick={handleEdit}
        >
          <Icon icon="edit">
            <FormattedMessage id="ui-serials-management.edit" />
          </Icon>
        </Button>
      );
    }
    return buttons.length ? buttons : null;
  };

  if (isLoading) {
    return <LoadingPane dismissible onClose={onClose} />;
  }

  return (
    <Pane
      actionMenu={renderActionMenu}
      defaultWidth={DEFAULT_VIEW_PANE_WIDTH}
      dismissible
      onClose={onClose}
    >
      <MetaSection
        contentId="serialMetaContent"
        createdDate={serial?.dateCreated}
        hideSource
        lastUpdatedDate={serial?.lastUpdated}
      />
      <SerialInfo {...getSectionProps('info')} />
      {!!serial?.orderLine?.remoteId && (
        <SerialPOLine {...getSectionProps('po-line')} />
      )}
      <Rulesets {...getSectionProps('recurrence-rulesets')} />
    </Pane>
  );
};

SerialView.propTypes = propTypes;

export default SerialView;
