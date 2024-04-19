import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';

import { Select, Col, Row } from '@folio/stripes/components';

import { requiredValidator } from '@folio/stripes-erm-components';

import {
  CHRONOLOGY_MONTH_DAY_FORMAT,
  CHRONOLOGY_WEEKDAY_FORMAT,
  CHRONOLOGY_MONTH_FORMAT,
  CHRONOLOGY_YEAR_FORMAT,
} from '../../../constants/selectOptionTranslations';

const ChronologyField = ({ name, templateConfig }) => {
  const intl = useIntl();

  const renderWeekdayFormatField = () => {
    return (
      <Field
        component={Select}
        dataOptions={[
          { value: '', label: '' },
          ...CHRONOLOGY_WEEKDAY_FORMAT.map(
            (o) => {
              return {
                value: o?.value,
                label: intl.formatMessage({ id: o?.id }),
              };
            }
          ),
        ]}
        label={
          <FormattedMessage id="ui-serials-management.ruleset.weekdayFormat" />
        }
        name={`${name}.weekdayFormat.value`}
        required
        validate={requiredValidator}
      />
    );
  };

  const renderMonthDayFormatField = () => {
    return (
      <Field
        component={Select}
        dataOptions={[
          { value: '', label: '' },
          ...CHRONOLOGY_MONTH_DAY_FORMAT.map(
            (o) => {
              return {
                value: o?.value,
                label: intl.formatMessage({ id: o?.id }),
              };
            }
          ),
        ]}
        label={
          <FormattedMessage id="ui-serials-management.ruleset.monthDayFormat" />
        }
        name={`${name}.monthDayFormat.value`}
        required
        validate={requiredValidator}
      />
    );
  };

  const renderMonthFormatField = () => {
    return (
      <Field
        component={Select}
        dataOptions={[
          { value: '', label: '' },
          ...CHRONOLOGY_MONTH_FORMAT.map(
            (o) => {
              return {
                value: o?.value,
                label: intl.formatMessage({ id: o?.id }),
              };
            }
          ),
        ]}
        label={
          <FormattedMessage id="ui-serials-management.ruleset.monthFormat" />
        }
        name={`${name}.monthFormat.value`}
        required
        validate={requiredValidator}
      />
    );
  };

  const renderYearFormatField = () => {
    return (
      <Field
        component={Select}
        dataOptions={[
          { value: '', label: '' },
          ...CHRONOLOGY_YEAR_FORMAT.map(
            (o) => {
              return {
                value: o?.value,
                label: intl.formatMessage({ id: o?.id }),
              };
            }
          ),
        ]}
        label={
          <FormattedMessage id="ui-serials-management.ruleset.yearFormat" />
        }
        name={`${name}.yearFormat.value`}
        required
        validate={requiredValidator}
      />
    );
  };

  const chronologyFormats = {
    chronology_date: {
      fields: [
        renderWeekdayFormatField(),
        renderMonthDayFormatField(),
        renderMonthFormatField(),
        renderYearFormatField(),
      ],
    },
    chronology_month: {
      fields: [renderMonthFormatField(), renderYearFormatField()],
    },
    chronology_year: {
      fields: [renderYearFormatField()],
    },
  };

  return (
    <Row>
      {chronologyFormats[
        templateConfig?.ruleType?.templateMetadataRuleFormat
      ]?.fields?.map((chronologyField, index) => {
        return (
          <Col key={`chronology-field-${name}[${index}]`} xs={3}>
            {chronologyField}
          </Col>
        );
      })}
    </Row>
  );
};

ChronologyField.propTypes = {
  name: PropTypes.string,
  templateConfig: PropTypes.object,
};

export default ChronologyField;
