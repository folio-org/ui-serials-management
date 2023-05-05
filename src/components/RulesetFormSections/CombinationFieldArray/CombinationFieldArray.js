import { FieldArray } from 'react-final-form-arrays';
import { useFormState, Field, useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import { Button, Select, Row, Col } from '@folio/stripes/components';
import { EditCard, requiredValidator } from '@folio/stripes-erm-components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import { useSerialsManagementRefdata, selectifyRefdata } from '../../utils';
import { SORTED_COMBINATION_TIME_UNITS } from '../../../constants/sortedArrays';

import CombinationField from '../CombinationField';

const [TIME_UNITS] = ['OmissionRule.TimeUnits'];

const CombinationFieldArray = () => {
  const { values } = useFormState();
  const { change } = useForm();
  const { items, onAddField, onDeleteField } =
    useKiwtFieldArray('combination.rules');
  const refdataValues = useSerialsManagementRefdata([TIME_UNITS]);

  return (
    <>
      <FieldArray name="combination.rules">
        {() => items.map((combination, index) => {
          return (
            <EditCard
              deleteButtonTooltipText={
                <FormattedMessage
                  id="ui-serials-management.ruleset.removeCombination"
                  values={{ index: index + 1 }}
                />
                }
              header={
                <FormattedMessage
                  id="ui-serials-management.ruleset.combinationIndex"
                  values={{ index: index + 1 }}
                />
                }
              onDelete={() => onDeleteField(index, combination)}
            >
              <Row>
                <Col xs={3}>
                  <Field
                    name={`combination.rules[${index}].timeUnit.value`}
                    render={({ input, meta }) => (
                      <Select
                        dataOptions={[
                          { value: '', label: '' },
                          ...selectifyRefdata(
                            refdataValues,
                            TIME_UNITS,
                            'value'
                          ).sort((a, b) => {
                            return (
                              SORTED_COMBINATION_TIME_UNITS.indexOf(a.value) -
                                SORTED_COMBINATION_TIME_UNITS.indexOf(b.value)
                            );
                          }),
                        ]}
                        input={input}
                        label={
                          <FormattedMessage id="ui-serials-management.ruleset.timeUnit" />
                          }
                        meta={meta}
                        onChange={(e) => change(`combination.rules[${index}]`, {
                          timeUnit: { value: e?.target?.value },
                        })
                          }
                        required
                      />
                    )}
                    validate={requiredValidator}
                  />
                </Col>
              </Row>
              {values?.combination?.rules[index]?.timeUnit && (
              <CombinationField
                combination={combination}
                index={index}
                name="combination.rules"
              />
              )}
            </EditCard>
          );
        })
        }
      </FieldArray>
      <Button disabled={values?.omission} onClick={() => onAddField({})}>
        <FormattedMessage id="ui-serials-management.ruleset.addCombination" />
      </Button>
    </>
  );
};

export default CombinationFieldArray;
