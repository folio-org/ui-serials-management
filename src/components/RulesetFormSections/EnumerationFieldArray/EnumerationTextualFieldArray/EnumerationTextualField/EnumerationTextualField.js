import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { NumberField } from '@k-int/stripes-kint-components';

import {
  Row,
  Col,
  TextField,
  IconButton,
  Select,
} from '@folio/stripes/components';
import {
  requiredValidator,
  composeValidators,
} from '@folio/stripes-erm-components';

import { validateWholeNumber } from '../../../../utils';

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
          {([ariaLabel]) => (
            <Field
              aria-label={ariaLabel}
              component={NumberField}
              name={`${name}.units`}
              required
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
          {([ariaLabel]) => (
            <Field
              aria-label={ariaLabel}
              component={Select}
              dataOptions={[{ label: '', value: '' }, ...dataOptions]}
              disabled={!dataOptions}
              id={`label-text-select-${index}`}
              // This NEEDS to be the refdata value ID due to backend binding issues
              name={`${name}.refdataValue.id`}
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
  index: PropTypes.number,
  level: PropTypes.object,
  onDeleteField: PropTypes.func,
  dataOptions: PropTypes.arrayOf(PropTypes.object),
};

export default EnumerationTextualField;
