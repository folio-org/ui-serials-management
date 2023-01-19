import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Col,
  IconButton,
  Row,
  Tooltip,
  TextArea,
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';
import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

const SerialNoteField = ({ fields: { name } }) => {
  const { items, onAddField, onDeleteField } = useKiwtFieldArray(name);
  return (
    <>
      {items.map((note, index) => {
        return (
          <div
            key={note + index}
            data-testid={`serialNoteFieldArray[${index}]`}
          >
            <Row>
              <Col xs={6}>
                <Field
                  autoFocus={!note?.id}
                  component={TextArea}
                  label={
                    <FormattedMessage id="ui-serials-management.serials.note" />
                  }
                  name={`${name}[${index}].note`}
                  required
                  validate={requiredValidator}
                />
              </Col>
              <Col xs={6}>
                <Tooltip
                  id={`note-${index + 1}-trash-button-tooltip`}
                  text={
                    <FormattedMessage
                      id="ui-serials-management.serials.removeNoteIndex"
                      values={{ index: index + 1 }}
                    />
                  }
                >
                  {({ ref, ariaIds }) => (
                    <IconButton
                      ref={ref}
                      aria-describedby={ariaIds.sub}
                      aria-labelledby={ariaIds.text}
                      icon="trash"
                      onClick={() => onDeleteField(index, note)}
                      style={{ paddingTop: '25px' }}
                    />
                  )}
                </Tooltip>
              </Col>
            </Row>
          </div>
        );
      })}
      <Button onClick={() => onAddField({})}>
        <FormattedMessage id="ui-serials-management.serials.addNote" />
      </Button>
    </>
  );
};

SerialNoteField.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const SerialNoteFieldArray = () => {
  return (
    <FieldArray component={SerialNoteField} name="notes" />
  );
};

export default SerialNoteFieldArray;
