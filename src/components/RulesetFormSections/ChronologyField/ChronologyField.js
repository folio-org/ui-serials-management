import PropTypes from 'prop-types';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';

import isEqual from 'lodash/isEqual';

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
  tokenIndex,
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
    if (!isEqual(chronologyValues, chronologyTokenArray)) {
      setChronologyValues(chronologyTokenArray);
    }
  }, [chronologyValues, values]);

  const renderWeekdayFormatField = useCallback(() => {
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
  }, [intl, name]);

  const renderMonthDayFormatField = useCallback(() => {
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
  }, [intl, name]);

  const renderMonthFormatField = useCallback(() => {
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
  }, [intl, name]);

  const renderYearFormatField = useCallback(() => {
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
  }, [intl, name]);

  const chronologyFormats = useMemo(() => ({
    chronology_date: {
      getFields: () => [
        renderWeekdayFormatField(),
        renderMonthDayFormatField(),
        renderMonthFormatField(),
        renderYearFormatField(),
        <div>
          <Label id="template-token-header">
            <FormattedMessage id="ui-serials-management.ruleset.template.tokens" />
            {tokensInfo}
            <ClipCopy text={chronologyValues[tokenIndex]} />
          </Label>
          {chronologyValues[tokenIndex]}
        </div>,
      ]
    },
    chronology_month: {
      getFields: () => [
        renderMonthFormatField(),
        renderYearFormatField(),
        <div>
          <Label id="template-token-header">
            <FormattedMessage id="ui-serials-management.ruleset.template.tokens" />
            {tokensInfo}
            <ClipCopy text={chronologyValues[tokenIndex]} />
          </Label>
          {chronologyValues[tokenIndex]}
        </div>,
      ],
    },
    chronology_year: {
      getFields: () => [
        renderYearFormatField(),
        <div>
          <Label id="template-token-header">
            <FormattedMessage id="ui-serials-management.ruleset.template.tokens" />
            {tokensInfo}
            <ClipCopy text={chronologyValues[tokenIndex]} />
          </Label>
          {chronologyValues[tokenIndex]}
        </div>,
      ],
    },
  }), [chronologyValues, renderMonthDayFormatField, renderMonthFormatField, renderWeekdayFormatField, renderYearFormatField, tokenIndex, tokensInfo]);

  return (
    <>
      <Row>
        {chronologyFormats[
          templateConfig?.ruleType?.templateMetadataRuleFormat
        ]?.getFields()?.map((chronologyField, index) => {
          return (
            <Col key={`chronology-field-${name}[${index}]`} xs={3}>
              {chronologyField}
            </Col>
          );
        })}
      </Row>
    </>
  );
};

ChronologyField.propTypes = {
  name: PropTypes.string,
  templateConfig: PropTypes.object,
  tokensInfo: PropTypes.func,
  tokenIndex: PropTypes.number,
  values: PropTypes.object
};

export default ChronologyField;
