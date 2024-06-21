import { useState, useEffect } from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { useFormState, Field, useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
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
    setRuleLabelValues(ruleLabelArray);
  }, [values]);

  useEffect(() => {
    let enumerationTokenCount = 0;
    let levelCount = 0;
    const enumerationTokenArray = values?.templateConfig?.rules?.map((e) => {
      if (e?.ruleType?.templateMetadataRuleFormat === 'enumeration_textual') {
        enumerationTokenCount++;
        return `{{enumeration${enumerationTokenCount}}}`;
      } else if (e?.ruleType?.templateMetadataRuleFormat === 'enumeration_numeric') {
        enumerationTokenCount++;
        levelCount++;
        return `{{enumeration${enumerationTokenCount}.level${levelCount}}}`;
      } else {
        return '';
      }
    });
    setEnumerationValues(enumerationTokenArray);
  }, [values]);

  const refdataValues = useSerialsManagementRefdata([
    RULE_TYPE,
    CHRONOLOGY_LABEL_FORMAT,
    ENUMERATION_LABEL_FORMAT,
  ]);

  const filterSelectValues = (value, dataOptions) => {
    const regex = new RegExp(value, 'i');

    return dataOptions.filter(({ label }) => label.search(regex) !== -1);
  };

  const renderTemplateInfo = () => {
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
  };

  const renderTemplateTokensInfo = () => {
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
  const renderLabelRule = (templateConfig, index) => {
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
                  onChange={(e) => {
                    change(`templateConfig.rules[${index}]`, {
                      templateMetadataRuleType: e?.target?.value,
                    });
                    if (e?.target?.value === 'chronology') {
                      change(`templateConfig.rules[${index}].ruleType`, {
                        ruleLocale: 'en',
                      });
                    } else {
                      change(`templateConfig.rules[${index}].ruleType`, undefined);
                    }
                  }}
                  required
                />
              )}
              validate={requiredValidator}
            />
          </Col>
          {values?.templateConfig?.rules[index]?.templateMetadataRuleType && (
            <>
              <Col xs={3}>
                <Field
                  name={`templateConfig.rules[${index}].ruleType.templateMetadataRuleFormat`}
                  render={({ input, meta }) => {
                    let selectedDataOptions = [];
                    if (
                      values?.templateConfig?.rules[index]
                        ?.templateMetadataRuleType === 'chronology'
                    ) {
                      selectedDataOptions = selectifyRefdata(
                        refdataValues,
                        CHRONOLOGY_LABEL_FORMAT,
                        'value'
                      );
                    } else if (
                      values?.templateConfig?.rules[index]
                        ?.templateMetadataRuleType === 'enumeration'
                    ) {
                      selectedDataOptions = selectifyRefdata(
                        refdataValues,
                        ENUMERATION_LABEL_FORMAT,
                        'value'
                      );
                    }
                    return (
                      <Select
                        dataOptions={[
                          { value: '', label: '' },
                          ...selectedDataOptions,
                        ]}
                        input={input}
                        label={
                          <FormattedMessage
                            id={`ui-serials-management.ruleset.${values?.templateConfig?.rules[index]?.templateMetadataRuleType}Format`}
                          />
                        }
                        meta={meta}
                        onChange={(e) => {
                          change(
                            `templateConfig.rules[${index}].ruleType.templateMetadataRuleFormat`,
                            e?.target?.value
                          );
                          change(
                            `templateConfig.rules[${index}].ruleType.ruleFormat`,
                            undefined
                          );
                          if (
                            values?.templateConfig?.rules[index]
                              ?.templateMetadataRuleType === 'enumeration'
                          ) {
                            change(
                              `templateConfig.rules[${index}].ruleType.ruleFormat.levels`,
                              [{}]
                            );
                          }
                        }}
                        required
                      />
                    );
                  }}
                  validate={requiredValidator}
                />
              </Col>
              {values?.templateConfig?.rules[index]?.templateMetadataRuleType ===
                'chronology' && (
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
              )}
            </>
          )}
        </Row>
        {values?.templateConfig?.rules[index]?.templateMetadataRuleType ===
          'chronology' &&
          values?.templateConfig?.rules[index]?.ruleType
            ?.templateMetadataRuleFormat && (
            <ChronologyField
              index={index}
              name={`templateConfig.rules[${index}].ruleType.ruleFormat`}
              templateConfig={templateConfig}
              tokensInfo={renderTemplateTokensInfo()}
              values={values}
            />
        )}
        {values?.templateConfig?.rules[index]?.templateMetadataRuleType ===
          'enumeration' &&
          values?.templateConfig?.rules[index]?.ruleType
            ?.templateMetadataRuleFormat === 'enumeration_numeric' && (
            <>
              <EnumerationNumericFieldArray
                name={`templateConfig.rules[${index}].ruleType.ruleFormat`}
                values={values}
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
  };

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
