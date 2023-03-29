import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, useFormState } from 'react-final-form';

import {
  Select,
  Col,
  TextField,
  Row,
  MultiSelection,
} from '@folio/stripes/components';

import {
  requiredValidator,
  composeValidators,
} from '@folio/stripes-erm-components';

import {
  SORTED_MONTHS,
  SORTED_WEEKDAYS,
} from '../../../constants/sortedArrays';

import {
  validateWithinRange,
  validateWholeNumber,
  useSerialsManagementRefdata,
  selectifyRefdata,
} from '../../utils';

const [MONTHS, WEEKDAYS] = ['Global.Month', 'Global.Weekday'];

const OmissionsField = ({ name, index }) => {
  const { values } = useFormState();
  const refdataValues = useSerialsManagementRefdata([MONTHS, WEEKDAYS]);

  const renderIssueField = (minValue = 1, maxValue = 1) => {
    return (
      <Field
        component={TextField}
        label={
          <FormattedMessage id="ui-serials-management.omissions.issue" />
        }
        name={`${name}[${index}].issue`}
        required
        type="number"
        validate={composeValidators(
          requiredValidator,
          validateWithinRange(minValue, maxValue),
          validateWholeNumber
        )}
      />
    );
  };

  const renderDayField = (minValue, maxValue) => {
    return (
      <Field
        component={TextField}
        label={<FormattedMessage id="ui-serials-management.recurrence.day" />}
        name={`${name}[${index}].day`}
        required
        type="number"
        validate={composeValidators(
          requiredValidator,
          validateWithinRange(minValue, maxValue),
          validateWholeNumber
        )}
      />
    );
  };

  const renderMonthField = (labelId) => {
    return (
      <Field
        component={Select}
        dataOptions={[
          { value: '', label: '' },
          ...selectifyRefdata(refdataValues, MONTHS, 'value').sort((a, b) => {
            return (
              SORTED_MONTHS.indexOf(a.value) - SORTED_MONTHS.indexOf(b.value)
            );
          }),
        ]}
        label={<FormattedMessage id={labelId} />}
        name={`${name}[${index}].month.value`}
        required
        validate={requiredValidator}
      />
    );
  };

  const renderMonthsField = () => {
    return (
      <Field
        component={MultiSelection}
        dataOptions={[
          ...selectifyRefdata(refdataValues, MONTHS, 'value').sort((a, b) => {
            return (
              SORTED_MONTHS.indexOf(a.value) - SORTED_MONTHS.indexOf(b.value)
            );
          }),
        ]}
        label={<FormattedMessage id="ui-serials-management.omissions.months" />}
        name={`${name}[${index}].months`}
        renderToOverlay
        required
        validate={requiredValidator}
      />
    );
  };

  const renderWeeksField = (minValue, maxValue, labelId) => {
    const dataOptions = [];
    for (let i = minValue; i <= maxValue; i++) {
      dataOptions.push({ value: i, label: i });
    }
    return (
      <Field
        component={MultiSelection}
        dataOptions={[...dataOptions]}
        label={<FormattedMessage id={labelId} />}
        name={`${name}[${index}].weeks`}
        renderToOverlay
        required
        validate={requiredValidator}
      />
    );
  };

  const renderWeekdayField = () => {
    return (
      <Field
        component={MultiSelection}
        dataOptions={[
          ...selectifyRefdata(refdataValues, WEEKDAYS, 'value').sort((a, b) => {
            return (
              SORTED_WEEKDAYS.indexOf(a.value) -
              SORTED_WEEKDAYS.indexOf(b.value)
            );
          }),
        ]}
        label={
          <FormattedMessage id="ui-serials-management.omissions.weekdays" />
        }
        name={`${name}[${index}].pattern.weekday.value`}
        renderToOverlay
        required
        validate={requiredValidator}
      />
    );
  };

  const omissionTypeFormats = {
    daysInMonth: {
      fields: [
        renderDayField(1, 31),
        renderMonthField('ui-serials-management.recurrence.ofMonth'),
      ],
    },
    weekdaysInWeek: {
      fields: [
        renderWeekdayField(),
        renderWeeksField(1, 52, 'ui-serials-management.omissions.inWeeks'),
      ],
    },
    weekdaysInMonth: {
      fields: [
        renderWeekdayField(),
        renderMonthField('ui-serials-management.omissions.inMonth'),
      ],
    },
    weeks: {
      fields: [
        renderWeeksField(1, 52, 'ui-serials-management.omissions.weeks'),
      ],
    },
    weeksInEveryMonth: {
      fields: [renderWeeksField(1, 4, 'ui-serials-management.omissions.weeks')],
    },
    months: {
      fields: [renderMonthsField()],
    },
    nthIssue: {
      fields: [
        renderIssueField(1, values?.recurrence?.issues),
        renderMonthField('ui-serials-management.recurrence.ofMonth'),
      ],
    },
  };

  return (
    <>
      <Row>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[
              { value: '', label: '' },
              { value: 'daysInMonth', label: 'Days in month' },
              { value: 'weekdaysInWeek', label: 'Weekdays in week' },
              { value: 'weekdaysInMonth', label: 'Weekdays in month' },
              { value: 'weeks', label: 'Weeks' },
              { value: 'weeksInEveryMonth', label: 'Weeks in every month' },
              { value: 'months', label: 'Months' },
              { value: 'nthIssue', label: 'Nth issue' },
            ]}
            label={
              <FormattedMessage id="ui-serials-management.omissions.omissionType" />
            }
            name={`${name}[${index}].omissionType.value`}
            required
            validate={requiredValidator}
          />
        </Col>
        {omissionTypeFormats[
          values?.omissions[index]?.omissionType?.value
        ]?.fields?.map((e) => {
          return <Col xs={3}>{e}</Col>;
        })}
      </Row>
    </>
  );
};

OmissionsField.propTypes = {
  name: PropTypes.string,
  index: PropTypes.string,
};

export default OmissionsField;
