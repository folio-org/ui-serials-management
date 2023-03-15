import { FieldArray } from 'react-final-form-arrays';
import { Field, useFormState, useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import { Row, Col, Select } from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import usePatternTypes from '../../../hooks/usePatternTypes';
import IssuePublicationField from '../IssuePublicationField';

const IssuePublicationFieldArray = () => {
  const { values } = useFormState();
  const { items } = useKiwtFieldArray('recurrence.rules');
  const { change } = useForm();
  const patternTypes = usePatternTypes();

  return (
    <>
      <Row>
        <Col xs={12}>
          <br />
          <strong>
            <FormattedMessage id="ui-serials-management.recurrence.issuePublication" />
          </strong>
        </Col>
      </Row>
      <br />
      {!!patternTypes[values?.recurrence?.timeUnit?.value] && (
        <Row>
          <Col xs={3}>
            <Field
              name="patternType"
              render={({ input, meta }) => (
                <Select
                  dataOptions={
                    patternTypes[values?.recurrence?.timeUnit?.value] || [
                      { label: '', value: '' },
                    ]
                  }
                  input={input}
                  // TODO Update to translated string when preffered name has been chosen
                  label="Pattern type"
                  meta={meta}
                  onChange={(e) => {
                    input.onChange(e);
                    if (
                      values?.recurrence?.issues &&
                      Number.isInteger(Number(values?.recurrence?.issues))
                    ) {
                      change(
                        'recurrence.rules',
                        Array(Number(values?.recurrence?.issues)).fill({})
                      );
                    }
                  }}
                  required
                />
              )}
              validate={requiredValidator}
            />
          </Col>
        </Row>
      )}
      {values?.patternType === 'day' ||
      (values?.patternType === 'week' &&
        (values?.recurrence?.period <= 1 || !values?.recurrence?.period)) ? (
          <IssuePublicationField
            index={0}
            issue={items[0]}
            name="recurrence.rules"
            patternType={values?.patternType}
          />
        ) : (
          <FieldArray name="recurrence.rules">
            {() => items.map((issue, index) => {
              return (
                <IssuePublicationField
                  index={index}
                  issue={issue}
                  name="recurrence.rules"
                  patternType={values?.patternType}
                />
              );
            })
          }
          </FieldArray>
        )}
    </>
  );
};

export default IssuePublicationFieldArray;
