import PropTypes from 'prop-types';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { Link } from 'react-router-dom';

import {
  Accordion,
  Badge,
  Col,
  Row,
  MultiColumnList,
} from '@folio/stripes/components';
import { FormattedDateTime } from '@folio/stripes-erm-components';

import { urls } from '../../utils';

const proptypes = {
  pieceSets: PropTypes.arrayOf(PropTypes.object),
};

const SerialPieceSets = ({ pieceSets }) => {
  const renderBadge = () => {
    return <Badge>{pieceSets?.length}</Badge>;
  };

  const formatter = {
    dateGenerated: (p) => {
      return (
        <>
          <Link to={urls.pieceSetView(p?.id)}>
            <FormattedDateTime date={p?.dateCreated} />
          </Link>
        </>
      );
    },
    startDate: (p) => {
      return <FormattedDate value={p?.startDate} />;
    },
    patternId: (p) => p?.ruleset?.rulesetNumber,
    total: (p) => p?.pieces?.length,
    note: (p) => p?.note,
  };

  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge()}
      displayWhenOpen={renderBadge()}
      label={
        <FormattedMessage id="ui-serials-management.pieceSets.predictedPieceSets" />
      }
    >
      <Row>
        <Col xs={12}>
          <MultiColumnList
            columnMapping={{
              dateGenerated: (
                <FormattedMessage id="ui-serials-management.pieceSets.dateGenerated" />
              ),
              startDate: (
                <FormattedMessage id="ui-serials-management.pieceSets.startDate" />
              ),
              patternId: (
                <FormattedMessage id="ui-serials-management.pieceSets.patternId" />
              ),
              total: (
                <FormattedMessage id="ui-serials-management.pieceSets.total" />
              ),
              note: (
                <FormattedMessage id="ui-serials-management.pieceSets.note" />
              ),
            }}
            // Column width needs to be updated with correct value when formatted time is implemented
            columnWidths={{
              dateGenerated: 170,
            }}
            contentData={pieceSets}
            formatter={formatter}
            interactive={false}
            visibleColumns={[
              'dateGenerated',
              'startDate',
              'patternId',
              'total',
              'note',
            ]}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

SerialPieceSets.propTypes = proptypes;

export default SerialPieceSets;
