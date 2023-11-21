import { FieldArray } from 'react-final-form-arrays';
import { useFormState, Field, useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import { Button, Select, Row, Col } from '@folio/stripes/components';
import { EditCard, requiredValidator } from '@folio/stripes-erm-components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import { useSerialsManagementRefdata, selectifyRefdata } from '../../utils';

import ChronologyField from '../ChronologyField';
import EnumerationNumericFieldArray from '../EnumerationNumericFieldArray';
import EnumerationCyclicalFieldArray from '../EnumerationCyclicalFieldArray';

const [RULE_TYPE, CHRONOLOGY_LABEL_FORMAT, ENUMERATION_LABEL_FORMAT] = [
  'TemplateMetadataRule.TemplateMetadataRuleType',
  'ChronologyTemplateMetadataRule.TemplateMetadataRuleFormat',
  'EnumerationTemplateMetadataRule.TemplateMetadataRuleFormat',
];

const LabelFieldArray = () => {
  const { values } = useFormState();
  const { change } = useForm();
  const { items, onAddField, onDeleteField } = useKiwtFieldArray(
    'templateConfig.rules'
  );
  const refdataValues = useSerialsManagementRefdata([
    RULE_TYPE,
    CHRONOLOGY_LABEL_FORMAT,
    ENUMERATION_LABEL_FORMAT,
  ]);

  return (
    <>
      <FieldArray name="templateConfig.rules">
        {() => items.map((templateConfig, index) => {
          return (
            <EditCard
              deleteButtonTooltipText={
                <FormattedMessage
                  id="ui-serials-management.ruleset.removeLabel"
                  values={{ index: index + 1 }}
                />
                }
              header={
                <FormattedMessage
                  id="ui-serials-management.ruleset.labelIndex"
                  values={{ index: index + 1 }}
                />
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
                          ...selectifyRefdata(
                            refdataValues,
                            RULE_TYPE,
                            'value'
                          ),
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
                          change(
                            `templateConfig.rules[${index}].ruleType`,
                            undefined
                          );
                        }}
                        required
                      />
                    )}
                    validate={requiredValidator}
                  />
                </Col>
                {values?.templateConfig?.rules[index]
                  ?.templateMetadataRuleType && (
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
                                  `templateConfig.rules[${index}].ruleType`,
                                  {
                                    templateMetadataRuleFormat:
                                      e?.target?.value,
                                  }
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
                )}
              </Row>
              {values?.templateConfig?.rules[index]
                ?.templateMetadataRuleType === 'chronology' &&
                  values?.templateConfig?.rules[index]?.ruleType
                    ?.templateMetadataRuleFormat && (
                    <ChronologyField
                      name={`templateConfig.rules[${index}].ruleType.ruleFormat`}
                      templateConfig={templateConfig}
                    />
              )}
              {values?.templateConfig?.rules[index]
                ?.templateMetadataRuleType === 'enumeration' &&
                  values?.templateConfig?.rules[index]?.ruleType
                    ?.templateMetadataRuleFormat === 'enumeration_numeric' && (
                    <EnumerationNumericFieldArray
                      name={`templateConfig.rules[${index}].ruleType.ruleFormat`}
                    />
              )}
              {values?.templateConfig?.rules[index]
                ?.templateMetadataRuleType === 'enumeration' &&
                  values?.templateConfig?.rules[index]?.ruleType
                    ?.templateMetadataRuleFormat === 'enumeration_cyclical' && (
                    <EnumerationCyclicalFieldArray
                      name={`templateConfig.rules[${index}].ruleType.ruleFormat`}
                    />
              )}
            </EditCard>
          );
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
    </>
  );
};

export default LabelFieldArray;
