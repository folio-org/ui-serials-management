import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, useFormState, useForm } from 'react-final-form';

import {
  Checkbox,
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

const [MONTHS, WEEKDAYS, OMISSION_PATTERN_TYPES] = ['Global.Month', 'Global.Weekday', 'OmissionRule.PatternType'];

// TODO patternType should really be patternType.value but currently backend dynamic class assignment doesnt support it,
// This should be fixed on backend then tweaked here

const OmissionsField = ({ name, index, omission }) => {
  const { values } = useFormState();
  const { change } = useForm();
  const refdataValues = useSerialsManagementRefdata([MONTHS, WEEKDAYS, OMISSION_PATTERN_TYPES]);

  const renderIssueField = (minValue = 1, maxValue = 1) => {
    return (
      <Field
        component={TextField}
        label={<FormattedMessage id="ui-serials-management.omissions.issue" />}
        name={`${name}[${index}].pattern.issue`}
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
        name={`${name}[${index}].pattern.day`}
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

  const renderMonthField = (labelId, fieldName = 'month.value') => {
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
        name={`${name}[${index}].pattern.${fieldName}`}
        required
        validate={requiredValidator}
      />
    );
  };

  const renderWeeksField = (minValue, maxValue, labelId) => {
    const dataOptions = [];
    for (let i = minValue; i <= maxValue; i++) {
      dataOptions.push({ value: i, label: String(i) });
    }

    return (
      <Field
        component={MultiSelection}
        dataOptions={[...dataOptions]}
        label={<FormattedMessage id={labelId} />}
        name={`${name}[${index}].pattern.weeks`}
        renderToOverlay
        required
        validate={requiredValidator}
      />
    );
  };

  const renderWeekField = (minValue, maxValue, labelId, fieldName = 'week') => {
    const dataOptions = [];
    for (let i = minValue; i <= maxValue; i++) {
      dataOptions.push({ value: i, label: i });
    }

    return (
      <Field
        component={Select}
        dataOptions={[{ value: '', label: '' }, ...dataOptions]}
        label={<FormattedMessage id={labelId} />}
        name={`${name}[${index}].pattern.${fieldName}`}
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

  const patternTypeFormats = {
    days_in_month: {
      fields: [
        renderDayField(1, 31),
        renderMonthField('ui-serials-management.recurrence.ofMonth'),
      ],
    },
    weekdays_in_week: {
      fields: [
        renderWeekdayField(),
        renderWeeksField(1, 52, 'ui-serials-management.omissions.inWeeks'),
      ],
    },
    weekdays_in_month: {
      fields: [
        renderWeekdayField(),
        renderMonthField('ui-serials-management.omissions.inMonth'),
      ],
    },
    weeks: {
      fields: [
        renderWeekField(
          1,
          52,
          !omission?.pattern?.omitRange
            ? 'ui-serials-management.recurrence.week'
            : 'ui-serials-management.omissions.weekFrom',
          omission?.pattern?.omitRange && 'weekFrom'
        ),
      ],
      range: [
        renderWeekField(
          1,
          52,
          'ui-serials-management.omissions.weekTo',
          'weekTo'
        ),
      ],
    },
    weeks_in_every_month: {
      fields: [renderWeeksField(1, 4, 'ui-serials-management.omissions.weeks')],
    },
    months: {
      fields: [
        renderMonthField(
          !omission?.pattern?.omitRange
            ? 'ui-serials-management.recurrence.month'
            : 'ui-serials-management.omissions.monthFrom',
          omission?.pattern?.omitRange && 'monthFrom.value'
        ),
      ],
      range: [
        renderMonthField(
          'ui-serials-management.omissions.monthTo',
          'monthTo.value'
        ),
      ],
    },
    nth_issue: {
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
              ...selectifyRefdata(refdataValues, OMISSION_PATTERN_TYPES, 'value')
            ]}
            label={
              <FormattedMessage id="ui-serials-management.omissions.omissionType" />
            }
            name={`${name}[${index}].patternType`}
            onChange={(e) => change(`${name}[${index}]`, {
              patternType: e?.target?.value,
            })
            }
            required
            validate={requiredValidator}
          />
        </Col>
        {patternTypeFormats[omission?.patternType]?.fields?.map(
          (e) => {
            return <Col xs={3}>{e}</Col>;
          }
        )}
      </Row>
      {(omission?.patternType === 'weeks' ||
        omission?.patternType === 'months') && (
        <Row>
          <Col xs={3}>
            <Field
              component={Checkbox}
              label={
                <FormattedMessage
                  id="ui-serials-management.omissions.omitRangeOf"
                  values={{ omissionType: omission?.patternType }}
                />
              }
              name={`${name}[${index}].pattern.omitRange`}
              onChange={(e) => {
                change(`${name}[${index}]`, {
                  patternType: omission?.patternType,
                  pattern: { omitRange: e.target.checked },
                });
              }}
              type="checkbox"
            />
          </Col>
          {omission?.pattern?.omitRange &&
            patternTypeFormats[omission?.patternType]?.range?.map(
              (e) => {
                return <Col xs={3}>{e}</Col>;
              }
            )}
        </Row>
      )}
    </>
  );
};

OmissionsField.propTypes = {
  name: PropTypes.string,
  index: PropTypes.string,
  omission: PropTypes.object,
};

export default OmissionsField;
