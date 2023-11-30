import PropTypes from 'prop-types';

import { Field } from 'react-final-form';

import {
  Row,
  Col,
  TextField,
  IconButton,
} from '@folio/stripes/components';

import { requiredValidator } from '@folio/stripes-erm-components';


const EnumerationTextualField = ({ items, name, index, level, onDeleteField }) => {
  return (
    <>
      <Row>
        <Col xs={1}>{index + 1}</Col>
        <Col xs={2}>
          <Field component={TextField} name={`${name}.units`} />
        </Col>
        <Col xs={2}>
          <Field
            component={TextField}
            name={`${name}.value`}
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field component={TextField} name={`${name}.internalNote`} />
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
    </>
  );
};

EnumerationTextualField.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  index: PropTypes.string,
  level: PropTypes.object,
  onDeleteField: PropTypes.func,
};

export default EnumerationTextualField;
