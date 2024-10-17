import { Field, useFormState, useForm } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { NumberField } from '@k-int/stripes-kint-components';

import {
  Row,
  Col,
  Select,
  Label,
  InfoPopover,
} from '@folio/stripes/components';
import {
  requiredValidator,
  composeValidators,
  selectifyRefdata,
} from '@folio/stripes-erm-components';

import {
  useSerialsManagementRefdata,
  validateWholeNumber,
  validateWithinRange,
} from '../../utils';
import { RECURRENCE_PATTERN_TYPE_OPTIONS } from '../../../constants/patternTypeOptions';
import { SORTED_RECURRENCE_TIME_UNITS } from '../../../constants/sortedArrays';

import css from './PatternTimePeriodForm.css';

const [TIME_UNITS] = ['Recurrence.TimeUnits'];

// Currently the frontend validation allows for an upper limit of 20 years, this may need changing in the future

const TIME_UNIT_LIMITERS = {
  day: { issues: 1, period: 365 },
  week: { issues: 7, period: 52 },
  month: { issues: 31, period: 12 },
  year: { issues: 365, period: 10 },
};

const PatternTimePeriodForm = () => {
  const { values } = useFormState();
  console.log(values);
  const { change } = useForm();
  const intl = useIntl();
  const refdataValues = useSerialsManagementRefdata([TIME_UNITS]);
  // FIXME Another annoying uses of '' to changes the entire form state in a single change function
  // Defintely not a fan, the way we set patternType could do with some refactoring/re-thinking
  const timeUnitOnChange = (e) => {
    change('', {
      ...values,
      recurrence: { timeUnit: { value: e?.target?.value } },
      patternType: e?.target?.value,
    });
  };

  const periodOnChange = (e) => {
    // Create new array of rules with all ordinal values unset
    const unsetOrdinalRules = values?.recurrence?.rules?.map((rule) => ({
      ...rule,
      ordinal: undefined,
    }));
    // Update recurrence in formstate to contain updated rules and period value
    change('recurrence', {
      ...values?.recurrence,
      period: e?.target?.value,
      rules: unsetOrdinalRules,
    });
  };

  const issuesOnChange = (e) => {
    // If timeunit is anything but 'day' clear patterntype, else keep as is
    // FIXME Not a fan of this implementation
    const timeUnit = values?.recurrence?.timeUnit?.value;
    const patternType = RECURRENCE_PATTERN_TYPE_OPTIONS[timeUnit]
      ? undefined
      : timeUnit;
    // Calculate max number of issues allowed for specified time unit and period
    const maxIssues =
      TIME_UNIT_LIMITERS[timeUnit]?.issues * (values?.recurrence?.period || 1);
    // If new number of issues is less than max, fill rules array with empty objects, otherwise clear
    // Additionally clear patternType so a new format can be selected
    change('', {
      ...values,
      recurrence: {
        ...values?.recurrence,
        issues: e?.target?.value,
        rules:
          e.target.value <= maxIssues && e.target.value > 0
            ? Array(Number(e?.target?.value)).fill({})
            : undefined,
      },
      patternType,
    });
  };

  return (
    <>
      <Row>
        <Col className={css.containerHeader} xs={6}>
          <Label className={css.label} tagName="h4">
            <FormattedMessage id="ui-serials-management.ruleset.cycleLength" />
            <InfoPopover
              content={
                <FormattedMessage id="ui-serials-management.ruleset.cycleLengthPopover" />
              }
            />
          </Label>
        </Col>
      </Row>
      <Row>
        <Col className={css.containerTimeUnit} xs={3}>
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
                onChange={(e) => timeUnitOnChange(e)}
                required
              />
            )}
            validate={requiredValidator}
          />
        </Col>
        <Col className={css.containerPeriod} xs={3}>
          <Field
            name="recurrence.period"
            render={({ input, meta }) => (
              <NumberField
                disabled={!values?.recurrence?.timeUnit}
                id="number-of-time-unit"
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
                onChange={(e) => periodOnChange(e)}
                required
              />
            )}
            validate={composeValidators(
              requiredValidator,
              validateWithinRange(
                1,
                TIME_UNIT_LIMITERS[values?.recurrence?.timeUnit?.value]?.period
              ),
              validateWholeNumber
            )}
          />
        </Col>
        <Col xs={3}>
          {/* IMPORTANT This needs to be patternType instead of patternType.value for the time being */}
          <Field
            name="recurrence.issues"
            render={({ input, meta }) => (
              <NumberField
                disabled={!values?.recurrence?.timeUnit}
                id="number-of-issue-per-cycle"
                input={input}
                label={
                  <>
                    <FormattedMessage id="ui-serials-management.ruleset.numberOfIssuesPerCycle" />
                    <InfoPopover
                      content={
                        <FormattedMessage id="ui-serials-management.ruleset.numberOfIssuesPerCyclePopover" />
                      }
                    />
                  </>
                }
                meta={meta}
                onChange={(e) => issuesOnChange(e)}
                required
              />
            )}
            validate={composeValidators(
              requiredValidator,
              validateWithinRange(
                1,
                TIME_UNIT_LIMITERS[values?.recurrence?.timeUnit?.value]
                  ?.issues * (values?.recurrence?.period || 1)
              ),
              validateWholeNumber
            )}
          />
        </Col>
      </Row>
    </>
  );
};

export default PatternTimePeriodForm;
