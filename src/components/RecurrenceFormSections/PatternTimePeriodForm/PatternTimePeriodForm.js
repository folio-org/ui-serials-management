import { Field, useFormState, useForm } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Row, Col, Select, TextField } from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';

import { useSerialsManagementRefdata, selectifyRefdata } from '../../utils';

const [TIME_UNITS] = ['Recurrence.TimeUnits'];

const PatternTimePeriodForm = () => {
  const { values } = useFormState();
  const { change, resetFieldState } = useForm();
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
            component={Select}
            dataOptions={[
              { value: '', label: '' },
              ...selectifyRefdata(refdataValues, TIME_UNITS, 'value'),
            ]}
            label={
              <FormattedMessage id="ui-serials-management.recurrence.timeUnit" />
            }
            name="recurrence.timeUnit"
            onChange={(e) => {
              change('recurrence.timeUnit', e?.target?.value);
              change('recurrence.period', null);
              resetFieldState('recurrence.period');
              change('recurrence.issues', null);
              resetFieldState('recurrence.issues');
              if (values?.patternType) {
                change('patternType', null);
                resetFieldState('patternType');
              }
            }}
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            disabled={!values?.recurrence?.timeUnit}
            label={
              <FormattedMessage
                id="ui-serials-management.recurrence.numberOfTimeUnit"
                values={{
                  timeUnit:
                    values?.recurrence?.timeUnit ||
                    intl
                      .formatMessage({
                        id: 'ui-serials-management.recurrence.timeUnit',
                      })
                      .toLocaleLowerCase(),
                }}
              />
            }
            name="recurrence.period"
            required
            type="number"
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            disabled={!values?.recurrence?.timeUnit}
            label={
              <FormattedMessage id="ui-serials-management.recurrence.numberOfIssues" />
            }
            name="recurrence.issues"
            required
            type="number"
            validate={requiredValidator}
          />
        </Col>
      </Row>
      {!!patternTypes[values?.recurrence?.timeUnit] && (
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
                component={Select}
                dataOptions={
                  patternTypes[values?.recurrence?.timeUnit] || [
                    { label: '', value: '' },
                  ]
                }
                label="<FIELD NAME>"
                name="patternType"
                required
                validate={requiredValidator}
              />
            </Col>
          </Row>
          <br />
        </>
      )}
    </>
  );
};

export default PatternTimePeriodForm;
