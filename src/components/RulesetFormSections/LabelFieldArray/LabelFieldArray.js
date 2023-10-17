import { FieldArray } from 'react-final-form-arrays';
import { useFormState, Field, useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import { Button, Select, Row, Col } from '@folio/stripes/components';
import { EditCard, requiredValidator } from '@folio/stripes-erm-components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import { useSerialsManagementRefdata, selectifyRefdata } from '../../utils';

import ChronologyField from '../ChronologyField';
import EnumerationFieldArray from '../EnumerationFieldArray';

const [LABEL_STYLE, CHRONOLOGY_LABEL_FORMAT] = [
  'LabelRule.LabelStyles',
  'LabelStyleChronology.LabelFormat',
];

const LabelFieldArray = () => {
  const { values } = useFormState();
  const { change } = useForm();
  const { items, onAddField, onDeleteField } = useKiwtFieldArray('label.rules');
  const refdataValues = useSerialsManagementRefdata([
    LABEL_STYLE,
    CHRONOLOGY_LABEL_FORMAT,
  ]);

  return (
    <>
      <FieldArray name="label.rules">
        {() => items.map((label, index) => {
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
              onDelete={() => onDeleteField(index, label)}
            >
              <Row>
                <Col xs={3}>
                  <Field
                    name={`label.rules[${index}].labelStyle`}
                    render={({ input, meta }) => (
                      <Select
                        dataOptions={[
                          { value: '', label: '' },
                          ...selectifyRefdata(
                            refdataValues,
                            LABEL_STYLE,
                            'value'
                          ),
                        ]}
                        input={input}
                        label={
                          <FormattedMessage id="ui-serials-management.ruleset.labelStyle" />
                          }
                        meta={meta}
                        onChange={(e) => {
                          change(`label.rules[${index}]`, {
                            labelStyle: e?.target?.value,
                          });
                          if (e?.target?.value === 'enumeration') {
                            change(`label.rules[${index}].style.levels`, [
                              {},
                            ]);
                          } else {
                            change(`label.rules[${index}].style`, undefined);
                          }
                        }}
                        required
                      />
                    )}
                    validate={requiredValidator}
                  />
                </Col>
                {values?.label?.rules[index]?.labelStyle === 'chronology' && (
                <Col xs={3}>
                  <Field
                    name={`label.rules[${index}].style.labelFormat`}
                    render={({ input, meta }) => (
                      <Select
                        dataOptions={[
                          { value: '', label: '' },
                          ...selectifyRefdata(
                            refdataValues,
                            CHRONOLOGY_LABEL_FORMAT,
                            'value'
                          ),
                        ]}
                        input={input}
                        label={
                          <FormattedMessage id="ui-serials-management.ruleset.chronologyFormat" />
                            }
                        meta={meta}
                        onChange={(e) => {
                          change(`label.rules[${index}].style`, {
                            labelFormat: e?.target?.value,
                          });
                          change(
                            `label.rules[${index}].style.format`,
                            undefined
                          );
                        }}
                        required
                      />
                    )}
                    validate={requiredValidator}
                  />
                </Col>
                )}
              </Row>
              {values?.label?.rules[index]?.labelStyle === 'chronology' &&
                  values?.label?.rules[index]?.style?.labelFormat && (
                    <ChronologyField
                      label={label}
                      name={`label.rules[${index}].style.format`}
                    />
              )}
              {values?.label?.rules[index]?.labelStyle === 'enumeration' && (
              <EnumerationFieldArray name={`label.rules[${index}].style`} />
              )}
            </EditCard>
          );
        })
        }
      </FieldArray>
      {!values?.label && (
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
