import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import { Select, Col, Row } from '@folio/stripes/components';

import { requiredValidator } from '@folio/stripes-erm-components';

import { useSerialsManagementRefdata, selectifyRefdata } from '../../utils';

import {
  CHRONOLOGY_MONTH_DAY_FORMAT,
  CHRONOLOGY_WEEKDAY_FORMAT,
  CHRONOLOGY_MONTH_FORMAT,
  CHRONOLOGY_YEAR_FORMAT,
} from '../../../constants/selectOptionTranslations';

const [WEEKDAY_FORMATS, MONTH_DAY_FORMATS, MONTH_FORMATS, YEAR_FORMATS] = [
  'Global.WeekdayFormat',
  'Global.MonthDayFormat',
  'Global.MonthFormat',
  'Global.YearFormat',
];

const ChronologyField = ({ name, templateConfig }) => {
  const refdataValues = useSerialsManagementRefdata([
    WEEKDAY_FORMATS,
    MONTH_DAY_FORMATS,
    MONTH_FORMATS,
    YEAR_FORMATS,
  ]);

  const renderWeekdayFormatField = () => {
    return (
      <Field
        component={Select}
        dataOptions={[
          { value: '', label: '' },
          ...selectifyRefdata(refdataValues, WEEKDAY_FORMATS, 'value').map(
            (o) => {
              return {
                value: o?.value,
                label: CHRONOLOGY_WEEKDAY_FORMAT?.find(
                  (e) => e?.value === o?.value
                )?.label,
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
          ...selectifyRefdata(refdataValues, MONTH_DAY_FORMATS, 'value').map(
            (o) => {
              return {
                value: o?.value,
                label: CHRONOLOGY_MONTH_DAY_FORMAT?.find(
                  (e) => e?.value === o?.value
                )?.label,
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
          ...selectifyRefdata(refdataValues, MONTH_FORMATS, 'value').map(
            (o) => {
              return {
                value: o?.value,
                label: CHRONOLOGY_MONTH_FORMAT?.find(
                  (e) => e?.value === o?.value
                )?.label,
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
          ...selectifyRefdata(refdataValues, YEAR_FORMATS, 'value').map((o) => {
            return {
              value: o?.value,
              label: CHRONOLOGY_YEAR_FORMAT?.find((e) => e?.value === o?.value)
                ?.label,
            };
          }),
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
      ]?.fields?.map((chronologyField, fieldIndex) => {
        return (
          <Col key={`chronology-field-${fieldIndex}`} xs={3}>
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
