import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';
import { ClipCopy } from '@folio/stripes/smart-components';
import {
  Select,
  Col,
  Row,
  Label,
  Layout,
  Button,
  InfoPopover,
} from '@folio/stripes/components';

import { requiredValidator } from '@folio/stripes-erm-components';

import {
  CHRONOLOGY_MONTH_DAY_FORMAT,
  CHRONOLOGY_WEEKDAY_FORMAT,
  CHRONOLOGY_MONTH_FORMAT,
  CHRONOLOGY_YEAR_FORMAT,
} from '../../../../constants/selectOptionTranslations';

const ChronologyField = ({ name, chronologyRule, index }) => {
  const intl = useIntl();

  const tokenText = useMemo(() => {
    switch (chronologyRule?.templateMetadataRuleFormat) {
      case 'chronology_date':
        return [
          `{{chronology${index + 1}.weekday}}`,
          `{{chronology${index + 1}.monthDay}}`,
          `{{chronology${index + 1}.month}}`,
          `{{chronology${index + 1}.year}}`,
        ].join(' ');
      case 'chronology_month':
        return [
          `{{chronology${index + 1}.month}}`,
          `{{chronology${index + 1}.year}}`,
        ].join(' ');
      case 'chronology_year':
        return [`{{chronology${index + 1}.year}}`].join(' ');
      default:
        return '';
    }
  }, [chronologyRule?.templateMetadataRuleFormat, index]);

  const renderTemplateTokensInfoPopover = () => {
    return (
      <InfoPopover
        content={
          <Layout className="flex flex-direction-column centerContent">
            <Layout>
              <FormattedMessage id="ui-serials-management.ruleset.templateTokensPopover" />
            </Layout>
            <Layout className="marginTop1">
              <Button
                allowAnchorClick
                buttonStyle="primary"
                href="https://folio-org.atlassian.net/wiki/x/dwA7CQ"
                marginBottom0
                rel="noreferrer"
                target="blank"
              >
                <FormattedMessage id="ui-serials-management.learnMore" />
              </Button>
            </Layout>
          </Layout>
        }
      />
    );
  };

  const renderTemplateTokens = useCallback(() => {
    return (
      <>
        <Label id="template-token-header">
          <FormattedMessage id="ui-serials-management.ruleset.template.tokens" />
          {renderTemplateTokensInfoPopover()}
          <ClipCopy text={tokenText} />
        </Label>
        {tokenText}
      </>
    );
  }, [tokenText]);

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
        label={
          <FormattedMessage id="ui-serials-management.ruleset.weekdayFormat" />
        }
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
        label={
          <FormattedMessage id="ui-serials-management.ruleset.monthFormat" />
        }
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
        label={
          <FormattedMessage id="ui-serials-management.ruleset.yearFormat" />
        }
        name={`${name}.yearFormat.value`}
        required
        validate={requiredValidator}
      />
    );
  }, [intl, name]);

  const chronologyFormats = useMemo(
    () => ({
      chronology_date: {
        getFields: () => [
          renderWeekdayFormatField(),
          renderMonthDayFormatField(),
          renderMonthFormatField(),
          renderYearFormatField(),
          renderTemplateTokens(),
        ],
      },
      chronology_month: {
        getFields: () => [
          renderMonthFormatField(),
          renderYearFormatField(),
          renderTemplateTokens(),
        ],
      },
      chronology_year: {
        getFields: () => [renderYearFormatField(), renderTemplateTokens()],
      },
    }),
    [
      renderMonthDayFormatField,
      renderMonthFormatField,
      renderTemplateTokens,
      renderWeekdayFormatField,
      renderYearFormatField,
    ]
  );

  return (
    <Row>
      {chronologyFormats[chronologyRule?.templateMetadataRuleFormat]
        ?.getFields()
        ?.map((chronologyField, fieldIndex) => {
          return (
            <Col key={`chronology-field-${name}[${fieldIndex}]`} xs={3}>
              {chronologyField}
            </Col>
          );
        })}
    </Row>
  );
};

ChronologyField.propTypes = {
  name: PropTypes.string,
  chronologyRule: PropTypes.object,
  index: PropTypes.number,
};

export default ChronologyField;
