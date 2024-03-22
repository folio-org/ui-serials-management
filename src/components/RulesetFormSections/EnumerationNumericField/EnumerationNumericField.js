import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Row,
  Col,
  Select,
  TextField,
  IconButton,
} from '@folio/stripes/components';

import {
  requiredValidator,
  composeValidators,
} from '@folio/stripes-erm-components';

import { ENUMERATION_NUMBER_FORMAT } from '../../../constants/selectOptionTranslations';
import {
  validateWholeNumber,
  useSerialsManagementRefdata,
  selectifyRefdata,
} from '../../utils';

const [ENUMERATION_FORMAT, ENUMERATION_SEQUENCE] = [
  'EnumerationNumericLevelTMRF.Format',
  'EnumerationNumericLevelTMRF.Sequence',
];

const EnumerationNumericField = ({
  items,
  name,
  index,
  level,
  onDeleteField,
}) => {
  const refdataValues = useSerialsManagementRefdata([
    ENUMERATION_FORMAT,
    ENUMERATION_SEQUENCE,
  ]);

  return (
    <Row>
      <Col xs={1}>{index + 1}</Col>
      <Col xs={2}>
        <FormattedMessage id="ui-serials-management.ruleset.numberOfUnits">
          {([ariaLabel]) => (
            <Field
              aria-label={ariaLabel}
              component={TextField}
              name={`${name}.units`}
              required
              type="number"
              validate={composeValidators(
                requiredValidator,
                validateWholeNumber
              )}
            />
          )}
        </FormattedMessage>
      </Col>
      <Col xs={2}>
        <FormattedMessage id="ui-serials-management.ruleset.format">
          {([ariaLabel]) => (
            <Field
              aria-label={ariaLabel}
              component={Select}
              dataOptions={[
                { value: '', label: '' },
                ...selectifyRefdata(
                  refdataValues,
                  ENUMERATION_FORMAT,
                  'value'
                ).map((o) => {
                  return {
                    value: o?.value,
                    label: ENUMERATION_NUMBER_FORMAT?.find(
                      (e) => e?.value === o?.value
                    )?.label,
                  };
                }),
              ]}
              id="format-value-select"
              name={`${name}.format.value`}
              required
              validate={requiredValidator}
            />
          )}
        </FormattedMessage>
      </Col>
      <Col xs={2}>
        <FormattedMessage id="ui-serials-management.ruleset.sequence">
          {([ariaLabel]) => (
            <Field
              aria-label={ariaLabel}
              component={Select}
              dataOptions={[
                { value: '', label: '' },
                ...selectifyRefdata(
                  refdataValues,
                  ENUMERATION_SEQUENCE,
                  'value'
                ),
              ]}
              id="sequence-value-select"
              name={`${name}.sequence.value`}
              required
              validate={requiredValidator}
            />
          )}
        </FormattedMessage>
      </Col>
      <Col xs={3}>
        <FormattedMessage id="ui-serials-management.ruleset.internalNote">
          {([ariaLabel]) => (
            <Field
              aria-label={ariaLabel}
              component={TextField}
              id="internal-note"
              name={`${name}.internalNote`}
            />
          )}
        </FormattedMessage>
      </Col>
      {items?.length > 1 && (
        <Col xs={2}>
          <IconButton
            icon="trash"
            onClick={() => onDeleteField(index, level)}
          />
        </Col>
      )}
    </Row>
  );
};

EnumerationNumericField.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  index: PropTypes.number,
  level: PropTypes.object,
  onDeleteField: PropTypes.func,
};

export default EnumerationNumericField;
