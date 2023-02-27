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
} from '../../utils';
import { SORTED_TIME_UNITS } from '../../../constants/sortedArrays';

const [TIME_UNITS] = ['Recurrence.TimeUnits'];

const PatternTimePeriodForm = () => {
  const { values } = useFormState();
  const { change } = useForm();
  const intl = useIntl();
  const refdataValues = useSerialsManagementRefdata([TIME_UNITS]);

  const patternTypes = {
    month: [
      {
        label: '',
        value: '',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.recurrence.day',
        })} (1-31)`,
        value: 'month_date',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.recurrence.day',
        })} (Mon-Sun), ${intl.formatMessage({
          id: 'ui-serials-management.recurrence.week',
        })} (1-4)`,
        value: 'month_weekday',
      },
    ],

    year: [
      {
        label: '',
        value: '',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.recurrence.day',
        })} (1-31), Month (Jan-Dec)`,
        value: 'year_date',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.recurrence.day',
        })} (Mon-Sun), ${intl.formatMessage({
          id: 'ui-serials-management.recurrence.week',
        })} (1-52)`,
        value: 'year_weekday',
      },
      {
        label: `${intl.formatMessage({
          id: 'ui-serials-management.recurrence.day',
        })} (1-31), ${intl.formatMessage({
          id: 'ui-serials-management.recurrence.week',
        })} (1-4), ${intl.formatMessage({
          id: 'ui-serials-management.recurrence.month',
        })} (Jan-Dec)`,
        value: 'year_month_weekday',
      },
    ],
  };

  return (
    <>
      <Row>
        <Col xs={12}>
          <strong>
            <FormattedMessage id="ui-serials-management.recurrence.patternTimePeriod" />
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
                        SORTED_TIME_UNITS.indexOf(a.value) -
                        SORTED_TIME_UNITS.indexOf(b.value)
                      );
                    }
                  ),
                ]}
                input={input}
                label={
                  <FormattedMessage id="ui-serials-management.recurrence.timeUnit" />
                }
                meta={meta}
                onChange={(e) => {
                  input.onChange(e);
                  change('recurrence.period', undefined);
                  change('recurrence.issues', undefined);
                  if (values?.patternType) {
                    change('patternType', undefined);
                  }
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
                    id="ui-serials-management.recurrence.numberOfTimeUnit"
                    values={{
                      timeUnit:
                        values?.recurrence?.timeUnit?.value ||
                        intl
                          .formatMessage({
                            id: 'ui-serials-management.recurrence.timeUnit',
                          })
                          .toLocaleLowerCase(),
                    }}
                  />
                }
                meta={meta}
                onChange={(e) => {
                  input.onChange(e);
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
            validate={composeValidators(requiredValidator, validateNotNegative)}
          />
        </Col>
        <Col xs={3}>
          <Field
            name="recurrence.issues"
            render={({ input, meta }) => (
              <TextField
                disabled={!values?.recurrence?.timeUnit}
                input={input}
                label={
                  <FormattedMessage id="ui-serials-management.recurrence.numberOfIssues" />
                }
                meta={meta}
                onChange={(e) => {
                  input.onChange(e);
                  change(
                    'recurrence.rules',
                    e?.target?.value > 0
                      ? Array(Number(e?.target?.value)).fill({})
                      : undefined
                  );
                }}
                required
                type="number"
              />
            )}
            validate={composeValidators(requiredValidator, validateNotNegative)}
          />
        </Col>
      </Row>
      {!!patternTypes[values?.recurrence?.timeUnit?.value] && (
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
                    label="<FIELD NAME>"
                    meta={meta}
                    onChange={(e) => {
                      input.onChange(e);
                      if (values?.recurrence?.issues) {
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
        </>
      )}
    </>
  );
};

export default PatternTimePeriodForm;
