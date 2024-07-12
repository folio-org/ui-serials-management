import { useState, useEffect, useMemo, useCallback } from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { useFormState, Field, useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import isEqual from 'lodash/isEqual';

import { ClipCopy } from '@folio/stripes/smart-components';

import {
  Button,
  Select,
  Row,
  Col,
  TextArea,
  Selection,
  InfoPopover,
  Layout,
  Label,
} from '@folio/stripes/components';
import {
  EditCard,
  requiredValidator,
  selectifyRefdata,
} from '@folio/stripes-erm-components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import { useSerialsManagementRefdata } from '../../utils';

import ChronologyField from '../ChronologyField';
import EnumerationNumericFieldArray from '../EnumerationNumericFieldArray';
import EnumerationTextualFieldArray from '../EnumerationTextualFieldArray';
import { useLocales } from '../../../hooks';

const [RULE_TYPE, CHRONOLOGY_LABEL_FORMAT, ENUMERATION_LABEL_FORMAT] = [
  'TemplateMetadataRule.TemplateMetadataRuleType',
  'ChronologyTemplateMetadataRule.TemplateMetadataRuleFormat',
  'EnumerationTemplateMetadataRule.TemplateMetadataRuleFormat',
];

const LabelFieldArray = () => {
  const { values } = useFormState();
  const { change } = useForm();
  const { data: locales } = useLocales();
  const { items, onAddField, onDeleteField } = useKiwtFieldArray(
    'templateConfig.rules'
  );

  const [ruleLabelValues, setRuleLabelValues] = useState([]);
  const [enumerationValues, setEnumerationValues] = useState([]);

  useEffect(() => {
    let chronologyCount = 0;
    let enumerationCount = 0;

    const ruleLabelArray = values?.templateConfig?.rules?.map((r) => {
      if (r?.templateMetadataRuleType === 'chronology') {
        chronologyCount++;
        return `: chronology ${chronologyCount}`;
      } else if (r?.templateMetadataRuleType === 'enumeration') {
        enumerationCount++;
        return `: enumeration ${enumerationCount}`;
      } else {
        return '';
      }
    });

    let enumerationTokenCount = 0;
    const enumerationTokenArray = values?.templateConfig?.rules?.map((e) => {
      if (e?.ruleType?.templateMetadataRuleFormat === 'enumeration_textual') {
        enumerationTokenCount++;
        return `{{enumeration${enumerationTokenCount}}}`;
      } else if (
        e?.ruleType?.templateMetadataRuleFormat === 'enumeration_numeric'
      ) {
        enumerationTokenCount++;
        const stringArray = e?.ruleType?.ruleFormat?.levels?.reduce(
          (a, _l, li) => [
            ...a,
            `{{enumeration${enumerationTokenCount}.level${li + 1}}}`,
          ],
          []
        );
        return stringArray.join(' ');
      } else {
        return '';
      }
    });
    if (!isEqual(ruleLabelValues, ruleLabelArray)) {
      setRuleLabelValues(ruleLabelArray);
    }
    if (!isEqual(enumerationValues, enumerationTokenArray)) {
      setEnumerationValues(enumerationTokenArray);
    }
  }, [enumerationValues, ruleLabelValues, values]);

  const refdataValues = useSerialsManagementRefdata([
    RULE_TYPE,
    CHRONOLOGY_LABEL_FORMAT,
    ENUMERATION_LABEL_FORMAT,
  ]);

  const enumerationOptions = useMemo(() => {
    return selectifyRefdata(
      refdataValues,
      ENUMERATION_LABEL_FORMAT,
      'value'
    );
  }, [refdataValues]);

  const chronologyOptions = useMemo(() => {
    return selectifyRefdata(
      refdataValues,
      ENUMERATION_LABEL_FORMAT,
      'value'
    );
  }, [refdataValues]);

  const filterSelectValues = useCallback((value, dataOptions) => {
    const regex = new RegExp(value, 'i');

    return dataOptions.filter(({ label }) => label.search(regex) !== -1);
  }, []);

  const renderTemplateInfo = useCallback(() => {
    return (
      <InfoPopover
        content={
          <Layout className="flex flex-direction-column centerContent">
            <Layout>
              <FormattedMessage id="ui-serials-management.ruleset.templatePopover" />
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
  }, []);

  const renderTemplateTokensInfo = useCallback(() => {
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
  }, []);

  const templateMetadataRuleTypeOnChange = useCallback((e, index) => {
    const ruleType = e?.target?.value === 'chronology' ? { ruleLocale: 'en' } : undefined; // NOTE... I don't like this one little bit

    // DO NOT do multiple change calls in a single onChange...
    change(`templateConfig.rules[${index}]`, {
      templateMetadataRuleType: e?.target?.value,
      ruleType
    });
  }, [change]);

  const chronologySelectorOnChange = useCallback((e, index) => {
    change(
      `templateConfig.rules[${index}]`,
      {
        templateMetadataRuleFormat: e?.target?.value,
        ruleType: undefined
      }
    );
  }, [change]);

  const renderChronologySelectors = useCallback((index) => {
    return (
      <>
        <Col xs={3}>
          <Field
            name={`templateConfig.rules[${index}].ruleType.templateMetadataRuleFormat`}
            render={({ input, meta }) => {
              return (
                <Select
                  dataOptions={[
                    { value: '', label: '' },
                    ...chronologyOptions,
                  ]}
                  input={input}
                  label={
                    <FormattedMessage
                      id="ui-serials-management.ruleset.chronologyFormat"
                    />
                  }
                  meta={meta}
                  onChange={e => chronologySelectorOnChange(e, index)}
                  required
                />
              );
            }}
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Selection}
            dataOptions={locales}
            label="Locale"
            name={`templateConfig.rules[${index}].ruleType.ruleLocale`}
            onFilter={filterSelectValues}
            parse={(v) => v}
            required
            validate={requiredValidator}
          />
        </Col>
      </>
    );
  }, [chronologyOptions, chronologySelectorOnChange, filterSelectValues, locales]);

  const enumerationSelectorOnChange = useCallback((e, index) => {
    change(
      `templateConfig.rules[${index}]`,
      {
        templateMetadataRuleFormat: e?.target?.value,
        ruleType: {
          levels: [{}]
        }
      }
    );
  }, [change]);

  const renderEnumerationSelectors = useCallback((index) => {
    return (
      <Col xs={3}>
        <Field
          name={`templateConfig.rules[${index}].ruleType.templateMetadataRuleFormat`}
          render={({ input, meta }) => {
            return (
              <Select
                dataOptions={[
                  { value: '', label: '' },
                  ...enumerationOptions,
                ]}
                input={input}
                label={
                  <FormattedMessage
                    id="ui-serials-management.ruleset.enumerationFormat"
                  />
                }
                meta={meta}
                onChange={e => enumerationSelectorOnChange(e, index)}
                required
              />
            );
          }}
          validate={requiredValidator}
        />
      </Col>
    );
  }, [enumerationOptions, enumerationSelectorOnChange]);

  const renderLabelRule = useCallback((templateConfig, index) => {
    // Using indexCount to prevent sonarlint from flagging this as an issue
    const indexKey = index;

    return (
      <EditCard
        key={`label-rule-card-${indexKey}`}
        data-testid="editCard"
        deleteButtonTooltipText={
          <FormattedMessage
            id="ui-serials-management.ruleset.removeLabel"
            values={{ index: index + 1 }}
          />
        }
        header={
          <>
            <FormattedMessage
              id="ui-serials-management.ruleset.labelIndex"
              values={{ index: index + 1 }}
            />
            {ruleLabelValues[index]}
          </>
        }
        onDelete={() => onDeleteField(index, templateConfig)}
      >
        <Row>
          <Col xs={3}>
            <Field
              name={`templateConfig.rules[${index}].templateMetadataRuleType`}
              render={({ input, meta }) => (
                <Select
                  dataOptions={[
                    { value: '', label: '' },
                    ...selectifyRefdata(refdataValues, RULE_TYPE, 'value'),
                  ]}
                  input={input}
                  label={
                    <FormattedMessage id="ui-serials-management.ruleset.labelStyle" />
                  }
                  meta={meta}
                  onChange={e => templateMetadataRuleTypeOnChange(e, index)}
                  required
                />
              )}
              validate={requiredValidator}
            />
          </Col>
          {
            values?.templateConfig?.rules[index]?.templateMetadataRuleType === 'chronology' &&
            renderChronologySelectors()
          }
          {
            values?.templateConfig?.rules[index]?.templateMetadataRuleType === 'enumeration' &&
            renderEnumerationSelectors()
          }
        </Row>
        {/*
          FIXME These should probs also be a part of this switch...
          in fact they should probs be two new components with
          stuff passed down
          */
        }
        {values?.templateConfig?.rules[index]?.templateMetadataRuleType ===
          'enumeration' &&
          values?.templateConfig?.rules[index]?.ruleType
            ?.templateMetadataRuleFormat === 'enumeration_numeric' && (
            <>
              <EnumerationNumericFieldArray
                name={`templateConfig.rules[${index}].ruleType.ruleFormat`}
              />
              <Label id="template-token-header">
                <FormattedMessage id="ui-serials-management.ruleset.template.tokens" />
                {renderTemplateTokensInfo()}
                <ClipCopy text={enumerationValues[index]} />
              </Label>
              {enumerationValues[index]}
            </>
        )}
        {values?.templateConfig?.rules[index]?.templateMetadataRuleType ===
          'enumeration' &&
          values?.templateConfig?.rules[index]?.ruleType
            ?.templateMetadataRuleFormat === 'enumeration_textual' && (
            <>
              <EnumerationTextualFieldArray
                index={index}
                name={`templateConfig.rules[${index}].ruleType.ruleFormat`}
              />
              <Label id="template-token-header">
                <FormattedMessage id="ui-serials-management.ruleset.template.tokens" />
                {renderTemplateTokensInfo()}
                <ClipCopy text={enumerationValues[index]} />
              </Label>
              {enumerationValues[index]}
            </>
        )}
      </EditCard>
    );
  }, [enumerationValues, onDeleteField, refdataValues, renderChronologySelectors, renderEnumerationSelectors, renderTemplateTokensInfo, ruleLabelValues, templateMetadataRuleTypeOnChange, values?.templateConfig?.rules]);

  return (
    <>
      <FieldArray name="templateConfig.rules">
        {() => items.map((templateConfig, index) => {
          return renderLabelRule(templateConfig, index);
        })
        }
      </FieldArray>
      {!values?.templateConfig && (
        <>
          <div>
            <FormattedMessage id="ui-serials-management.ruleset.noLabels" />
          </div>
          <br />
        </>
      )}
      <Button onClick={() => onAddField({})}>
        <FormattedMessage id="ui-serials-management.ruleset.addLabel" />
      </Button>
      <Row>
        <Col xs={12}>
          <Field
            component={TextArea}
            label={
              <>
                <FormattedMessage id="ui-serials-management.ruleset.template" />
                {renderTemplateInfo()}
              </>
            }
            name="templateConfig.templateString"
            required
            validate={requiredValidator}
          />
        </Col>
      </Row>
    </>
  );
};

export default LabelFieldArray;
