import { FieldArray } from 'react-final-form-arrays';
import { Field, useFormState, useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import {
  Row,
  Col,
  Select,
  Label,
  InfoPopover,
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import useRecurrencePatternTypes from '../../../hooks/useRecurrencePatternTypes';
import IssuePublicationField from '../IssuePublicationField';

const IssuePublicationFieldArray = () => {
  const { values } = useFormState();
  const { items } = useKiwtFieldArray('recurrence.rules');
  const { change } = useForm();
  const patternTypes = useRecurrencePatternTypes();

  return (
    <>
      <Row>
        <Col xs={12}>
          <Label tagName="h4">
            <FormattedMessage id="ui-serials-management.ruleset.daysOfPublicationPerCycle" />
            <InfoPopover
              content={
                <FormattedMessage
                  id="ui-serials-management.ruleset.daysOfPublicationPerCyclePopover"
                  values={{ br: <br /> }}
                />
              }
            />
          </Label>
        </Col>
      </Row>
      <br />
      {!!patternTypes[values?.recurrence?.timeUnit?.value] && (
        <Row>
          <Col xs={3}>
            {/* IMPORTANT This needs to be patternType instead of patternType.value for the time being */}
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
                  label={
                    <FormattedMessage id="ui-serials-management.ruleset.dayFormat" />
                  }
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
      {values?.patternType === 'day' &&
      (values?.recurrence?.period <= 1 || !values?.recurrence?.period) ? (
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
