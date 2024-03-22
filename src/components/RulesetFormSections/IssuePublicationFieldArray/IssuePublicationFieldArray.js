import { FieldArray } from 'react-final-form-arrays';
import { Field, useFormState, useForm } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  Row,
  Col,
  Select,
  Label,
  InfoPopover,
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import { RECURRENCE_PATTERN_TYPES } from '../../../constants/patternTypes';
import IssuePublicationField from '../IssuePublicationField';

const IssuePublicationFieldArray = () => {
  const intl = useIntl();
  const { values } = useFormState();
  const { items } = useKiwtFieldArray('recurrence.rules');
  const { change } = useForm();

  // Check if the cycle length is a daily issue, defined by timeUnit="Day" and period=1
  // This will cause the "Days of publication, per cycle" section not to render if so
  const dailyIssueCheck = () => {
    return (
      values?.patternType === 'day' &&
      (values?.recurrence?.period <= 1 || !values?.recurrence?.period)
    );
  };

  return (
    <>
      {!dailyIssueCheck() && (
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
        </>
      )}
      {!!RECURRENCE_PATTERN_TYPES[values?.recurrence?.timeUnit?.value] && (
        <Row>
          <Col xs={3}>
            {/* IMPORTANT This needs to be patternType instead of patternType.value for the time being */}
            <Field
              name="patternType"
              render={({ input, meta }) => (
                <Select
                  dataOptions={[
                    { label: '', value: '' },
                    ...RECURRENCE_PATTERN_TYPES[values?.recurrence?.timeUnit?.value].map(
                      (e) => {
                        return {
                          value: e?.value,
                          label: e?.labels
                            ?.map((l) => intl.formatMessage({ id: l?.id }))
                            ?.join(', '),
                        };
                      }
                    ),
                  ]}
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
      {!dailyIssueCheck() && (
        <FieldArray name="recurrence.rules">
          {() => items.map((issue, index) => {
            return (
              <IssuePublicationField
                key={`issue-publication-field-${index}`}
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
