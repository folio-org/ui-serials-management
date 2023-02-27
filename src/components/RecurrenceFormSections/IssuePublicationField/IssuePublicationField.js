import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, useFormState, useForm } from 'react-final-form';

import {
  Col,
  IconButton,
  Label,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';
import {
  requiredValidator,
  composeValidators,
} from '@folio/stripes-erm-components';
import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import {
  useSerialsManagementRefdata,
  selectifyRefdata,
  validateWithinRange,
} from '../../utils';
import {
  SORTED_MONTHS,
  SORTED_WEEKDAYS,
} from '../../../constants/sortedArrays';

const propTypes = {
  issue: PropTypes.object,
  name: PropTypes.string,
  index: PropTypes.string,
  patternType: PropTypes.string,
};

const [MONTHS, WEEKDAYS] = [
  'RecurrencePattern.Month',
  'RecurrencePattern.Weekday',
];

const IssuePublicationField = ({ issue, name, index, patternType }) => {
  const { values } = useFormState();
  const { change } = useForm();
  const refdataValues = useSerialsManagementRefdata([MONTHS, WEEKDAYS]);
  const { onDeleteField } = useKiwtFieldArray(name);

  const renderDayField = (minValue, maxValue) => {
    return (
      <Field
        component={TextField}
        label={<FormattedMessage id="ui-serials-management.recurrence.day" />}
        name={`${name}[${index}].pattern.day`}
        required
        type="number"
        validate={composeValidators(
          requiredValidator,
          validateWithinRange(minValue, maxValue)
        )}
      />
    );
  };

  const renderWeekdayField = () => {
    return (
      <Field
        component={Select}
        dataOptions={[
          { value: '', label: '' },
          ...selectifyRefdata(refdataValues, WEEKDAYS, 'value').sort((a, b) => {
            return (
              SORTED_WEEKDAYS.indexOf(a.value) - SORTED_WEEKDAYS.indexOf(b.value)
            );
          }),
        ]}
        label={<FormattedMessage id="ui-serials-management.recurrence.day" />}
        name={`${name}[${index}].pattern.weekday.value`}
        required
        validate={requiredValidator}
      />
    );
  };

  const renderWeekField = (minValue, maxValue) => {
    return (
      <Field
        component={TextField}
        label={
          <FormattedMessage id="ui-serials-management.recurrence.ofWeek" />
        }
        name={`${name}[${index}].pattern.week`}
        required
        type="number"
        validate={composeValidators(
          requiredValidator,
          validateWithinRange(minValue, maxValue)
        )}
      />
    );
  };

  const renderMonthField = (ordinal = false, minValue = 1, maxValue = 1) => {
    return (
      <Field
        component={ordinal ? TextField : Select}
        dataOptions={[
          { value: '', label: '' },
          ...selectifyRefdata(refdataValues, MONTHS, 'value').sort((a, b) => {
            return (
              SORTED_MONTHS.indexOf(a.value) - SORTED_MONTHS.indexOf(b.value)
            );
          }),
        ]}
        label={
          <FormattedMessage id="ui-serials-management.recurrence.ofMonth" />
        }
        name={
          ordinal
            ? `${name}[${index}].ordinal`
            : `${name}[${index}].pattern.month.value`
        }
        required
        validate={
          ordinal
            ? composeValidators(
              requiredValidator,
              validateWithinRange(minValue, maxValue)
            )
            : requiredValidator
        }
      />
    );
  };

  const renderYearField = (ordinal = false, minValue = 1, maxValue = 1) => {
    return (
      <Field
        component={TextField}
        label={
          <FormattedMessage id="ui-serials-management.recurrence.ofYear" />
        }
        name={
          ordinal
            ? `${name}[${index}].ordinal`
            : `${name}[${index}].pattern.year`
        }
        required
        type="number"
        validate={composeValidators(
          requiredValidator,
          validateWithinRange(minValue, maxValue)
        )}
      />
    );
  };

  const patternTypeFormats = {
    day: { fields: [renderDayField()] },
    week: { fields: [renderWeekdayField()] },
    month_date: {
      fields: [renderDayField(1, 31)],
      ordinal: renderMonthField(true, 1, values?.recurrence?.period),
    },
    month_weekday: {
      fields: [renderWeekdayField(), renderWeekField(1, 4)],
      ordinal: renderMonthField(true, 1, values?.recurrence?.period),
    },
    year_date: {
      fields: [renderDayField(1, 31), renderMonthField()],
      ordinal: renderYearField(true, 1, values?.recurrence?.period),
    },
    year_weekday: {
      fields: [renderWeekdayField(), renderWeekField(1, 52)],
      ordinal: renderYearField(true, 1, values?.recurrence?.period),
    },
    year_month_weekday: {
      fields: [renderWeekdayField(), renderWeekField(1, 4), renderMonthField()],
      ordinal: renderYearField(true, 1, values?.recurrence?.period),
    },
  };

  return (
    <>
      {values?.patternType && (
        <Row>
          <Col xs={1}>
            <Label style={{ paddingTop: '25px' }}>
              <FormattedMessage
                id="ui-serials-management.recurrence.issueIndex"
                values={{ index: index + 1 }}
              />
            </Label>
          </Col>
          {patternTypeFormats[patternType].fields.map((e) => {
            return <Col xs={2}>{e}</Col>;
          })}
          {values?.recurrence?.period > 1 && (
            <Col xs={2}>{patternTypeFormats[patternType]?.ordinal}</Col>
          )}
          <Col xs={1}>
            <IconButton
              icon="trash"
              onClick={() => {
                onDeleteField(index, issue);
                change('recurrence.issues', values?.recurrence?.issues - 1);
              }}
              style={{ paddingTop: '25px' }}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

IssuePublicationField.propTypes = propTypes;

export default IssuePublicationField;
