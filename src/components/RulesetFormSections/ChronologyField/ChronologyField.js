import PropTypes from 'prop-types';
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
  dateTokens,
  monthTokens,
  yearTokens,
  tokensInfo,
}) => {
  const intl = useIntl();

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
            <ClipCopy text={dateTokens} />
          </Label>

          {dateTokens}
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
            <ClipCopy text={monthTokens} />
          </Label>

          {monthTokens}
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
            <ClipCopy text={yearTokens} />
          </Label>
          {yearTokens}
        </div>,
      ],
    },
  };

  return (
    <>
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
    </>
  );
};

ChronologyField.propTypes = {
  name: PropTypes.string,
  templateConfig: PropTypes.object,
  dateTokens: PropTypes.func,
  monthTokens: PropTypes.func,
  yearTokens: PropTypes.func,
  tokensInfo: PropTypes.func,
};

export default ChronologyField;
