import { Field, useFormState, useForm } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Row, Col, Select, TextField } from '@folio/stripes/components';
import {
  requiredValidator,
  composeValidators,
} from '@folio/stripes-erm-components';

import {
  useSerialsManagementRefdata,
  selectifyRefdata,
  validateNotNegative,
  validateWholeNumber,
  validateWithinRange,
} from '../../utils';
import useRecurrencePatternTypes from '../../../hooks/useRecurrencePatternTypes';
import { SORTED_RECURRENCE_TIME_UNITS } from '../../../constants/sortedArrays';

const [TIME_UNITS] = ['Recurrence.TimeUnits'];

const TIME_UNIT_LIMITERS = {
  day: 1,
  week: 7,
  month: 31,
  year: 366,
};

const PatternTimePeriodForm = () => {
  const { values } = useFormState();
  const { change } = useForm();
  const intl = useIntl();
  const patternTypes = useRecurrencePatternTypes();
  const refdataValues = useSerialsManagementRefdata([TIME_UNITS]);

  // TODO patternType should really be patternType.value but currently backend dynamic class assignment doesnt support it,
  // This should be fixed on backend then tweaked here

  return (
    <>
      <Row>
        <Col xs={12}>
          <strong>
            <FormattedMessage id="ui-serials-management.ruleset.patternTimePeriod" />
          </strong>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={3}>
          <Field
            name="recurrence.timeUnit.value"
            render={({ input, meta }) => (
              <Select
                dataOptions={[
                  { value: '', label: '' },
                  ...selectifyRefdata(refdataValues, TIME_UNITS, 'value').sort(
                    (a, b) => {
                      return (
                        SORTED_RECURRENCE_TIME_UNITS.indexOf(a.value) -
                        SORTED_RECURRENCE_TIME_UNITS.indexOf(b.value)
                      );
                    }
                  ),
                ]}
                input={input}
                label={
                  <FormattedMessage id="ui-serials-management.ruleset.timeUnit" />
                }
                meta={meta}
                onChange={(e) => {
                  input.onChange(e);
                  change('recurrence.period', undefined);
                  change('recurrence.issues', undefined);
                  if (values?.patternType) {
                    change('patternType', undefined);
                  }
                  // If a value is supplied and does not have corresponding patternType options
                  // Assign the patternType value the timeUnit value
                  if (e?.target?.value && !patternTypes[e?.target?.value]) {
                    change('patternType', e?.target?.value);
                  }
                  change('recurrence.rules', undefined);
                }}
                required
              />
            )}
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            name="recurrence.period"
            render={({ input, meta }) => (
              <TextField
                disabled={!values?.recurrence?.timeUnit}
                input={input}
                label={
                  <FormattedMessage
                    id="ui-serials-management.ruleset.numberOfTimeUnit"
                    values={{
                      timeUnit:
                        values?.recurrence?.timeUnit?.value ||
                        intl
                          .formatMessage({
                            id: 'ui-serials-management.ruleset.timeUnit',
                          })
                          .toLocaleLowerCase(),
                    }}
                  />
                }
                meta={meta}
                onChange={(e) => {
                  input.onChange(e);
                  // Since recurrence.period determines whether or not ordinals are assigned to the rules
                  // Clear all ordinal fields within form when recurrence.period is changed
                  if (values?.recurrence?.rules?.length) {
                    for (
                      let i = 0;
                      i < values?.recurrence?.rules?.length;
                      i++
                    ) {
                      change(`recurrence.rules[${i}].ordinal`, undefined);
                    }
                  }
                }}
                required
                type="number"
              />
            )}
            validate={composeValidators(
              requiredValidator,
              validateNotNegative,
              validateWholeNumber
            )}
          />
        </Col>
        <Col xs={3}>
          {/* IMPORTANT This needs to be patternType instead of patternType.value for the time being */}
          <Field
            name="recurrence.issues"
            render={({ input, meta }) => (
              <TextField
                disabled={!values?.recurrence?.timeUnit}
                input={input}
                label={
                  <FormattedMessage id="ui-serials-management.ruleset.numberOfIssues" />
                }
                meta={meta}
                onChange={(e) => {
                  input.onChange(e);
                  // Create an array of empty objects corresponding to amount of issues
                  change(
                    'recurrence.rules',
                    e?.target?.value > 0 &&
                      Number.isInteger(Number(e?.target?.value))
                      ? Array(Number(e?.target?.value)).fill({})
                      : undefined
                  );
                  if (patternTypes[values?.recurrence?.timeUnit?.value]) {
                    change('patternType', undefined);
                  }
                }}
                required
                type="number"
              />
            )}
            validate={composeValidators(
              requiredValidator,
              validateNotNegative,
              validateWholeNumber,
              validateWithinRange(
                1,
                TIME_UNIT_LIMITERS[values?.recurrence?.timeUnit?.value] *
                  (values?.recurrence?.period || 1)
              )
            )}
          />
        </Col>
      </Row>
    </>
  );
};

export default PatternTimePeriodForm;
