/* eslint-disable react/style-prop-object */
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Badge,
  Col,
  Row,
  MultiColumnList,
} from '@folio/stripes/components';

import { FormattedDateTime } from '@folio/stripes-erm-components';

const proptypes = {
  serial: PropTypes.object,
};

const DeprecatedPublicationPatterns = ({ serial }) => {
  const deprecatedRulesets = serial?.serialRulesets?.filter(
    (sr) => sr?.rulesetStatus?.value === 'deprecated'
  );

  const formatter = {
    patternId: (e) => e.rulesetNumber,
    lastUpdated: (e) => <FormattedDateTime date={e?.lastUpdated} />,
    description: (e) => e?.description,
  };

  const renderBadge = () => {
    return <Badge>{deprecatedRulesets?.length}</Badge>;
  };

  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge()}
      displayWhenOpen={renderBadge()}
      label={
        <FormattedMessage id="ui-serials-management.ruleset.deprecatedPublicationPatterns" />
      }
    >
      {!!deprecatedRulesets?.length && (
        <Row>
          <Col xs={12}>
            <MultiColumnList
              columnMapping={{
                patternId: (
                  <FormattedMessage id="ui-serials-management.ruleset.patternId" />
                ),
                lastUpdated: (
                  <FormattedMessage id="ui-serials-management.lastUpdated" />
                ),
                description: (
                  <FormattedMessage id="ui-serials-management.ruleset.patternDescription" />
                ),
              }}
              contentData={deprecatedRulesets}
              formatter={formatter}
              interactive={false}
              visibleColumns={['patternId', 'lastUpdated', 'description']}
            />
          </Col>
        </Row>
      )}
    </Accordion>
  );
};

DeprecatedPublicationPatterns.propTypes = proptypes;

export default DeprecatedPublicationPatterns;
