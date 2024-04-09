import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Badge,
  Col,
  Row,
  MultiColumnList,
} from '@folio/stripes/components';

const proptypes = {
  serial: PropTypes.object,
};

const SerialNotes = ({ serial }) => {
  const renderBadge = () => {
    return <Badge>{serial?.notes?.length}</Badge>;
  };

  const formatter = {
    note: (p) => p?.note,
  };

  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge()}
      displayWhenOpen={renderBadge()}
      label={
        <FormattedMessage id="ui-serials-management.serials.notes" />
      }
    >
      <Row>
        <Col xs={12}>
          <MultiColumnList
            columnMapping={{
              note: (
                <FormattedMessage id="ui-serials-management.pieceSets.note" />
              ),
            }}
            contentData={serial?.notes}
            formatter={formatter}
            id="serial-notes"
            interactive={false}
            isEmptyMessage={
              <FormattedMessage id="ui-serials-management.serials.notes.isEmptyMessage" />
            }
            visibleColumns={[
              'note',
            ]}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

SerialNotes.propTypes = proptypes;

export default SerialNotes;
