/* eslint-disable react/style-prop-object */
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  Accordion,
  Badge,
  Col,
  Row,
  MultiColumnList,
  KeyValue,
} from '@folio/stripes/components';

import { getSortedItems } from '../../utils';

import { RECURRENCE_PATTERN_TYPE_TRANSLATIONS } from '../../../constants/patternTypeTranslations';

const proptypes = {
  ruleset: PropTypes.object,
};

const IssuePublication = ({ ruleset }) => {
  const intl = useIntl();

  const sortedRules = getSortedItems(ruleset?.recurrence?.rules, null, {
    column: 'ordinal',
    direction: 'asc',
  });

  const patternTypeVisibleColumns = {
    day: ['issue', 'day'],
    week: ['issue', 'day', 'week'],
    month_date: ['issue', 'day', 'month'],
    month_weekday: ['issue', 'day', 'week', 'month'],
    year_date: ['issue', 'day', 'month', 'year'],
    year_weekday: ['issue', 'day', 'week', 'year'],
    year_month_weekday: ['issue', 'day', 'week', 'month', 'year'],
  };

  const formatter = {
    issue: (e) => e?.rowIndex + 1,
    day: (e) => e?.pattern?.weekday?.label || e?.pattern?.day || e?.ordinal,
    week: (e) => e?.pattern?.week || e?.ordinal,
    month: (e) => e?.pattern?.month?.label || e?.ordinal,
    year: (e) => e?.pattern?.year || e?.ordinal,
  };

  const renderBadge = () => {
    return <Badge>{sortedRules?.length}</Badge>;
  };

  return (
    <Accordion
      displayWhenClosed={renderBadge()}
      displayWhenOpen={renderBadge()}
      label={
        <FormattedMessage id="ui-serials-management.ruleset.daysOfPublicationPerCycle" />
      }
    >
      <Row>
        <Col xs={12}>
          <KeyValue
            label={
              <FormattedMessage id="ui-serials-management.ruleset.dayFormat" />
            }
            value={
              RECURRENCE_PATTERN_TYPE_TRANSLATIONS[
                ruleset?.recurrence?.rules[0]?.patternType?.value
              ]?.labels
                ?.map((l) => intl.formatMessage({ id: l?.id }))
                ?.join(', ') || ruleset?.recurrence?.timeUnit?.label
            }
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <MultiColumnList
            columnMapping={{
              issue: (
                <FormattedMessage id="ui-serials-management.ruleset.issue" />
              ),
              day: <FormattedMessage id="ui-serials-management.ruleset.day" />,
              week: (
                <FormattedMessage id="ui-serials-management.ruleset.week" />
              ),
              month: (
                <FormattedMessage id="ui-serials-management.ruleset.month" />
              ),
              year: (
                <FormattedMessage id="ui-serials-management.ruleset.year" />
              ),
            }}
            contentData={sortedRules}
            formatter={formatter}
            id="issue-publication-list"
            interactive={false}
            visibleColumns={
              patternTypeVisibleColumns[
                ruleset?.recurrence?.rules[0]?.patternType?.value
              ]
            }
          />
        </Col>
      </Row>
    </Accordion>
  );
};

IssuePublication.propTypes = proptypes;

export default IssuePublication;
