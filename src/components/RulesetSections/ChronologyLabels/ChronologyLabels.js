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

const proptypes = {
  ruleset: PropTypes.object,
};

const ChronologyLabels = ({ ruleset }) => {
  const intl = useIntl();
  // The filterning of templateConfig rules will be irrelevant when enumeration and chronology have been seperated
  const sortedLabels = getSortedItems(
    ruleset?.templateConfig?.rules?.filter(
      (e) => e?.templateMetadataRuleType?.value === 'chronology'
    ),
    null,
    {
      column: 'index',
      direction: 'asc',
    }
  );

  const formatter = {
    label: (e) => {
      return intl
        .formatMessage({ id: 'ui-serials-management.ruleset.chronology' })
        ?.concat(' ', e?.index + 1);
    },
    chronologyFormat: (e) => e?.ruleType?.templateMetadataRuleFormat?.label,
    weekdayFormat: (e) => e?.ruleType?.ruleFormat?.weekdayFormat?.label,
    monthdayFormat: (e) => e?.ruleType?.ruleFormat?.monthDayFormat?.label,
    monthFormat: (e) => e?.ruleType?.ruleFormat?.monthFormat?.label,
    yearFormat: (e) => e?.ruleType?.ruleFormat?.yearFormat?.label,
    locale: (e) => e?.ruleType?.ruleLocale,
  };

  const renderBadge = () => {
    return <Badge>{sortedLabels?.length}</Badge>;
  };

  return (
    <Accordion
      displayWhenClosed={renderBadge()}
      displayWhenOpen={renderBadge()}
      label={
        <FormattedMessage id="ui-serials-management.ruleset.chronologyLabels" />
      }
    >
      <Row>
        <Col xs={12}>
          <MultiColumnList
            columnMapping={{
              label: (
                <FormattedMessage id="ui-serials-management.ruleset.labelling" />
              ),
              chronologyFormat: (
                <FormattedMessage id="ui-serials-management.ruleset.chronologyFormat" />
              ),
              weekdayFormat: (
                <FormattedMessage id="ui-serials-management.ruleset.weekdayFormat" />
              ),
              monthdayFormat: (
                <FormattedMessage id="ui-serials-management.ruleset.monthDayFormat" />
              ),
              monthFormat: (
                <FormattedMessage id="ui-serials-management.ruleset.monthFormat" />
              ),
              yearFormat: (
                <FormattedMessage id="ui-serials-management.ruleset.yearFormat" />
              ),
              locale: (
                <FormattedMessage id="ui-serials-management.ruleset.chronology.locale" />
              ),
            }}
            contentData={sortedLabels}
            formatter={formatter}
            interactive={false}
            visibleColumns={[
              'label',
              'chronologyFormat',
              'weekdayFormat',
              'monthdayFormat',
              'monthFormat',
              'yearFormat',
              'locale',
            ]}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

ChronologyLabels.propTypes = proptypes;

export default ChronologyLabels;
