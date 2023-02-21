import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, useFormState } from 'react-final-form';
import {
  Col,
  IconButton,
  Label,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';
import { useSerialsManagementRefdata, selectifyRefdata } from '../../utils';

const propTypes = {
  fields: PropTypes.object,
  name: PropTypes.string,
  index: PropTypes.string,
  patternType: PropTypes.string,
};

const [MONTHS, WEEKDAYS] = [
  'RecurrencePattern.Month',
  'RecurrencePattern.Weekday',
];

const IssuePublicationField = ({ fields, name, index, patternType }) => {
  const { values } = useFormState();
  const refdataValues = useSerialsManagementRefdata([MONTHS, WEEKDAYS]);

  const renderDayField = () => {
    return (
      <Field
        component={TextField}
        label={<FormattedMessage id="ui-serials-management.recurrence.day" />}
        name={`${name}.pattern.day`}
        required
        type="number"
        validate={requiredValidator}
      />
    );
  };

  const renderWeekdayField = () => {
    return (
      <Field
        component={Select}
        dataOptions={[
          { value: '', label: '' },
          ...selectifyRefdata(refdataValues, WEEKDAYS, 'value'),
        ]}
        label={<FormattedMessage id="ui-serials-management.recurrence.day" />}
        name={`${name}.pattern.weekday`}
        required
        validate={requiredValidator}
      />
    );
  };

  const renderWeekField = () => {
    return (
      <Field
        component={TextField}
        label={
          <FormattedMessage id="ui-serials-management.recurrence.ofWeek" />
        }
        name={`${name}.pattern.week`}
        required
        type="number"
        validate={requiredValidator}
      />
    );
  };

  const renderMonthField = (ordinal = false) => {
    return (
      <Field
        component={ordinal ? TextField : Select}
        dataOptions={[
          { value: '', label: '' },
          ...selectifyRefdata(refdataValues, MONTHS, 'value'),
        ]}
        label={
          <FormattedMessage id="ui-serials-management.recurrence.ofMonth" />
        }
        name={ordinal ? `${name}.ordinal` : `${name}.pattern.month`}
        required
        validate={requiredValidator}
      />
    );
  };

  const renderYearField = (ordinal = false) => {
    return (
      <Field
        component={TextField}
        label={
          <FormattedMessage id="ui-serials-management.recurrence.ofYear" />
        }
        name={ordinal ? `${name}.ordinal` : `${name}.pattern.year`}
        required
        type="number"
        validate={requiredValidator}
      />
    );
  };

  const patternTypeFormats = {
    day: { fields: [renderDayField()] },
    week: { fields: [renderWeekdayField()] },
    month_date: { fields: [renderDayField()], ordinal: renderMonthField(true) },
    month_weekday: {
      fields: [renderWeekdayField(), renderWeekField()],
      ordinal: renderMonthField(true),
    },
    year_date: {
      fields: [renderDayField(), renderMonthField()],
      ordinal: renderYearField(true),
    },
    year_weekday: {
      fields: [renderWeekdayField(), renderWeekField()],
      ordinal: renderYearField(true),
    },
    year_month_weekday: {
      fields: [renderWeekdayField(), renderWeekField(), renderMonthField()],
      ordinal: renderYearField(true),
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
              onClick={() => fields.remove(index)}
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
