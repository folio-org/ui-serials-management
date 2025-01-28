import PropTypes from 'prop-types';
import { useMemo } from 'react';
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
  chronologyRule,
  tokensInfo,
  tokenIndex,
}) => {
  const intl = useIntl();

  const tokenText = useMemo(() => {
    switch (chronologyRule?.templateMetadataRuleFormat) {
      case 'chronology_date':
        return [
          `{{chronology${tokenIndex + 1}.weekday}}`,
          `{{chronology${tokenIndex + 1}.monthDay}}`,
          `{{chronology${tokenIndex + 1}.month}}`,
          `{{chronology${tokenIndex + 1}.year}}`,
        ].join(' ');
      case 'chronology_month':
        return [
          `{{chronology${tokenIndex + 1}.month}}`,
          `{{chronology${tokenIndex + 1}.year}}`,
        ].join(' ');
      case 'chronology_year':
        return [`{{chronology${tokenIndex + 1}.year}}`].join(' ');
      default:
        return '';
    }
  }, [chronologyRule?.templateMetadataRuleFormat, tokenIndex]);

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
          ...CHRONOLOGY_YEAR_FORMAT.map((o) => {
            return {
              value: o?.value,
              label: intl.formatMessage({ id: o?.id }),
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
        <div>
          <Label id="template-token-header">
            <FormattedMessage id="ui-serials-management.ruleset.template.tokens" />
            {tokensInfo}
            <ClipCopy text={tokenText} />
          </Label>
          {tokenText}
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
            <ClipCopy text={tokenText} />
          </Label>
          {tokenText}
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
            <ClipCopy text={tokenText} />
          </Label>
          {tokenText}
        </div>,
      ],
    },
  };

  return (
    <>
      <Row>
        {chronologyFormats[
          chronologyRule?.templateMetadataRuleFormat
        ]?.fields?.map((chronologyField, index) => {
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
  chronologyRule: PropTypes.object,
  tokensInfo: PropTypes.func,
  tokenIndex: PropTypes.number,
};

export default ChronologyField;
