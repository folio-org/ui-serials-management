import React from 'react';
import { Form, Field } from 'react-final-form';
import { Button, Datepicker } from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';

const SimpleDateForm = () => {
  return (
    <Form
      onSubmit={() => { }}
      render={({ handleSubmit, submitting, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          <Field
            component={Datepicker}
            id="ruleset-start-date"
            label="Start Date"
            name="startDate"
            required
            usePortal
            validate={requiredValidator}
          />
          <Button
            disabled={submitting || invalid || pristine}
            id="submit-button"
            type="submit"
          >
            Submit
          </Button>
        </form>
      )}
    />
  );
};

export default SimpleDateForm;
