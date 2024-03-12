import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Row,
  Col,
  TextField,
  IconButton,
  Select,
} from '@folio/stripes/components';
import {
  composeValidators,
  requiredValidator,
} from '@folio/stripes-erm-components';

import { validateWholeNumber } from '../../utils';

const EnumerationTextualField = ({
  items,
  name,
  index,
  level,
  onDeleteField,
  dataOptions,
}) => {
  return (
    <Row>
      <Col xs={1}>{index + 1}</Col>
      <Col xs={2}>
        <FormattedMessage id="ui-serials-management.ruleset.numberOfIssues">
          {(ariaLabel) => (
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
        <FormattedMessage id="ui-serials-management.ruleset.labelText">
          {(ariaLabel) => (
            <Field
              aria-label={ariaLabel}
              component={Select}
              dataOptions={[{ label: '', value: '' }, ...dataOptions]}
              disabled={!dataOptions}
              name={`${name}.value`}
              required
              validate={requiredValidator}
            />
          )}
        </FormattedMessage>
      </Col>
      <Col xs={3}>
        <FormattedMessage id="ui-serials-management.ruleset.internalNote">
          {(ariaLabel) => (
            <Field
              aria-label={ariaLabel}
              component={TextField}
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

EnumerationTextualField.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  index: PropTypes.string,
  level: PropTypes.object,
  onDeleteField: PropTypes.func,
  dataOptions: PropTypes.arrayOf(PropTypes.object),
};

export default EnumerationTextualField;
