import PropTypes from 'prop-types';
import get from 'lodash/get';

import { Field, useFormState, useForm } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import { FormattedMessage } from 'react-intl';

import { Button, Label, Row, Col, Select } from '@folio/stripes/components';

import { requiredValidator } from '@folio/stripes-erm-components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import { useSerialsManagementRefdata } from '../../utils';
import EnumerationTextualField from '../EnumerationTextualField';

const EnumerationTextualFieldArray = ({ name }) => {
  const { values } = useFormState();
  const { change } = useForm();
  const { items, onAddField, onDeleteField } = useKiwtFieldArray(
    `${name}.levels`
  );
  const refdata = useSerialsManagementRefdata();

  const refdataOptions =
    refdata?.map((e) => {
      return { label: e?.desc, value: e?.desc };
    }) ?? [];

  return (
    <>
      <Row>
        <Col xs={3}>
          <Field
            name={`${name}.refdataCategory`}
            render={({ input, meta }) => (
              <Select
                dataOptions={[{ label: '', value: '' }, ...refdataOptions]}
                input={input}
                label={
                  <FormattedMessage id="ui-serials-management.ruleset.pickList" />
                }
                meta={meta}
                onChange={(e) => {
                  input.onChange(e);
                  if (get(values, `${name}.levels`, null)?.length) {
                    for (
                      let i = 0;
                      i < get(values, `${name}.levels`, null)?.length;
                      i++
                    ) {
                      change(`${name}.levels[${i}].value`, undefined);
                    }
                  }
                }}
                required
              />
            )}
            validate={requiredValidator}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={1}>
          <Label>
            <FormattedMessage id="ui-serials-management.ruleset.order" />
          </Label>
        </Col>
        <Col xs={2}>
          <Label required>
            <FormattedMessage id="ui-serials-management.ruleset.numberOfIssues" />
          </Label>
        </Col>
        <Col xs={2}>
          <Label required>
            <FormattedMessage id="ui-serials-management.ruleset.labelText" />
          </Label>
        </Col>
        <Col xs={2}>
          <Label>
            <FormattedMessage id="ui-serials-management.ruleset.internalNote" />
          </Label>
        </Col>
      </Row>
      <FieldArray name={`${name}.levels`}>
        {() => items?.map((level, index) => {
          return (
            <EnumerationTextualField
              key={`${name}.levels[${index}]`}
              dataOptions={
                  refdata
                    ?.find(
                      (e) => e?.desc === get(values, `${name}.refdataCategory`, null)
                    )
                    ?.values.map((e) => {
                      return { label: e?.label, value: e?.label };
                    }) ?? []
                }
              index={index}
              items={items}
              level={level}
              name={`${name}.levels[${index}]`}
              onDeleteField={onDeleteField}
            />
          );
        })
        }
      </FieldArray>
      <Button onClick={() => onAddField({})}>
        <FormattedMessage id="ui-serials-management.ruleset.addValue" />
      </Button>
    </>
  );
};

EnumerationTextualFieldArray.propTypes = {
  name: PropTypes.string,
};

export default EnumerationTextualFieldArray;
