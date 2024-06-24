import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';
import { ClipCopy } from '@folio/stripes/smart-components';
import { Select, Col, Row, Label } from '@folio/stripes/components';

import { requiredValidator } from '@folio/stripes-erm-components';

import {
  CHRONOLOGY_MONTH_DAY_FORMAT,
  CHRONOLOGY_WEEKDAY_FORMAT,
  CHRONOLOGY_MONTH_FORMAT,
  CHRONOLOGY_YEAR_FORMAT,
} from '../../../constants/selectOptionTranslations';

const ChronologyField = ({
  name,
  templateConfig,
  tokensInfo,
  index,
  values
}) => {
  const intl = useIntl();
  const [chronologyValues, setChronologyValues] = useState([]);

  useEffect(() => {
    let chronologyTokenCount = 0;
    const chronologyTokenArray = values?.templateConfig?.rules?.map((c) => {
      if (c?.ruleType?.templateMetadataRuleFormat === 'chronology_date') {
        chronologyTokenCount++;
        return [
          `{{chronology${chronologyTokenCount}.weekday}}`,
          `{{chronology${chronologyTokenCount}.monthDay}}`,
          `{{chronology${chronologyTokenCount}.month}}`,
          `{{chronology${chronologyTokenCount}.year}}`,
        ].join(' ');
      } else if (c?.ruleType?.templateMetadataRuleFormat === 'chronology_month') {
        chronologyTokenCount++;
        return [
          `{{chronology${chronologyTokenCount}.month}}`,
          `{{chronology${chronologyTokenCount}.year}}`].join(' ');
      } else if (c?.ruleType?.templateMetadataRuleFormat === 'chronology_year') {
        chronologyTokenCount++;
        return [`{{chronology${chronologyTokenCount}.year}}`].join(' ');
      } else {
        return '';
      }
    });
    setChronologyValues(chronologyTokenArray);
  }, [values]);

  const renderWeekdayFormatField = () => {
    return (
      <Field
        component={Select}
        dataOptions={[
          { value: '', label: '' },
          ...CHRONOLOGY_WEEKDAY_FORMAT.map((o) => {
            return {
              value: o?.value,
              label: intl.formatMessage({ id: o?.id }),
            };
          }),
        ]}
        label={<FormattedMessage id="ui-serials-management.ruleset.weekdayFormat" />}
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
          ...CHRONOLOGY_MONTH_DAY_FORMAT.map((o) => {
            return {
              value: o?.value,
              label: intl.formatMessage({ id: o?.id }),
            };
          }),
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
          ...CHRONOLOGY_MONTH_FORMAT.map((o) => {
            return {
              value: o?.value,
              label: intl.formatMessage({ id: o?.id }),
            };
          }),
        ]}
        label={<FormattedMessage id="ui-serials-management.ruleset.monthFormat" />}
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
          ...CHRONOLOGY_YEAR_FORMAT.map((o) => {
            return {
              value: o?.value,
              label: intl.formatMessage({ id: o?.id }),
            };
          }),
        ]}
        label={<FormattedMessage id="ui-serials-management.ruleset.yearFormat" />}
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
        <div>
          <Label id="template-token-header">
            <FormattedMessage id="ui-serials-management.ruleset.template.tokens" />
            {tokensInfo}
            <ClipCopy text={chronologyValues[index]} />
          </Label>
          {chronologyValues[index]}
        </div>,
      ],
    },
    chronology_month: {
      fields: [
        renderMonthFormatField(),
        renderYearFormatField(),
        <div>
          <Label id="template-token-header">
            <FormattedMessage id="ui-serials-management.ruleset.template.tokens" />
            {tokensInfo}
            <ClipCopy text={chronologyValues[index]} />
          </Label>
          {chronologyValues[index]}
        </div>,
      ],
    },
    chronology_year: {
      fields: [
        renderYearFormatField(),
        <div>
          <Label id="template-token-header">
            <FormattedMessage id="ui-serials-management.ruleset.template.tokens" />
            {tokensInfo}
            <ClipCopy text={chronologyValues[index]} />
          </Label>
          {chronologyValues[index]}
        </div>,
      ],
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
  tokensInfo: PropTypes.func,
  index: PropTypes.number,
  values: PropTypes.array
};

export default ChronologyField;
