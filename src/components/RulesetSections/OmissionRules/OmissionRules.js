/* eslint-disable react/style-prop-object */
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  Accordion,
  Badge,
  Col,
  Row,
  MultiColumnList,
} from '@folio/stripes/components';

import { getSortedItems } from '../../utils';

import { OMISSION_COMBINATION_PATTERN_TYPE_TRANSLATIONS } from '../../../constants/patternTypeTranslations';

const proptypes = {
  ruleset: PropTypes.object,
};

const OmissionRules = ({ ruleset }) => {
  const intl = useIntl();

  const sortedRules = getSortedItems(ruleset?.omission?.rules, null, {
    column: 'patternType.value',
    direction: 'asc',
  });

  const formatter = {
    omissionRuleType: (e) => {
      return OMISSION_COMBINATION_PATTERN_TYPE_TRANSLATIONS[
        e?.patternType?.value
      ]?.labels
        ?.map((l) => intl.formatMessage({ id: l?.id }))
        ?.join(', ');
    },
    day: (e) => e?.pattern?.day || e?.pattern?.weekday?.label,
    weeks: (e) => {
      return e?.pattern?.weekTo
        ? `${e?.pattern?.weekFrom} - ${e?.pattern?.weekTo}`
        : (e?.pattern?.weekFrom ?? e?.pattern?.week);
    },
    months: (e) => {
      return e?.pattern?.monthTo
        ? `${e?.pattern?.monthFrom?.label} - ${e?.pattern?.monthTo?.label}`
        : (e?.pattern?.monthFrom?.label ?? e?.pattern?.month?.label);
    },
    issue: (e) => e?.pattern?.issue,
  };

  const renderBadge = () => {
    return <Badge>{ruleset?.omission?.rules?.length}</Badge>;
  };

  return (
    <Accordion
      displayWhenClosed={renderBadge()}
      displayWhenOpen={renderBadge()}
      label={
        <FormattedMessage id="ui-serials-management.ruleset.omissionRules" />
      }
    >
      <Row>
        <Col xs={12}>
          <MultiColumnList
            columnMapping={{
              omissionRuleType: (
                <FormattedMessage id="ui-serials-management.ruleset.omissionRuleType" />
              ),
              day: <FormattedMessage id="ui-serials-management.ruleset.day" />,
              weeks: (
                <FormattedMessage id="ui-serials-management.ruleset.weeks" />
              ),
              months: (
                <FormattedMessage id="ui-serials-management.ruleset.months" />
              ),
              issue: (
                <FormattedMessage id="ui-serials-management.ruleset.issue" />
              ),
            }}
            contentData={sortedRules}
            formatter={formatter}
            id="omission-rules-list"
            interactive={false}
            visibleColumns={[
              'omissionRuleType',
              'day',
              'weeks',
              'months',
              'issue',
            ]}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

OmissionRules.propTypes = proptypes;

export default OmissionRules;
