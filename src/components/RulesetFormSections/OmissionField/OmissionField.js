import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, useFormState } from 'react-final-form';

import {
  Select,
  Button,
  Col,
  IconButton,
  TextField,
  Row,
  Label,
  Tooltip,
} from '@folio/stripes/components';

import {
  requiredValidator,
  composeValidators,
} from '@folio/stripes-erm-components';

import { validateWithinRange, validateWholeNumber } from '../../utils';

const OmissionsField = ({ name, index, omission }) => {
  const { values } = useFormState();

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

  const omissionTypeFormats = {
    daysInMonth: {
      fields: [renderDayField(1, 31)],
    },
    // weekdaysInWeek: {
    //   fields: [renderWeekdayField()],
    // },
    // weekdaysInMonth: {
    //   fields: [renderDayField(false, 1, 31)],
    // },
    // weeks: {
    //   fields: [renderWeekdayField(), renderWeekField(false, 1, 4)],
    // },
    // weeksInEveryMonth: {
    //   fields: [renderDayField(false, 1, 31), renderMonthField()],
    // },
    // months: {
    //   fields: [renderWeekdayField(), renderWeekField(false, 1, 52)],
    // },
    // nthIssue: {
    //   fields: [
    //     renderWeekdayField(),
    //     renderWeekField(false, 1, 4),
    //     renderMonthField(),
    //   ],
    // },
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
  omission: PropTypes.object,
};

export default OmissionsField;
