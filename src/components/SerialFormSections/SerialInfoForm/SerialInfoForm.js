import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import { Row, Col, TextArea, Select } from '@folio/stripes/components';

import { requiredValidator } from '@folio/stripes-erm-components';
import { useSerialsManagementRefdata, selectifyRefdata } from '../../utils';

const [SERIAL_STATUS] = ['Serial.SerialStatus'];

const SerialInfoForm = () => {
  const refdataValues = useSerialsManagementRefdata([SERIAL_STATUS]);

  return (
    <Row>
      <Col xs={3}>
        <Field
          component={Select}
          dataOptions={[
            { value: '', label: '' },
            ...selectifyRefdata(refdataValues, SERIAL_STATUS, 'value'),
          ]}
          id="serials-status"
          label={<FormattedMessage id="ui-serials-management.serials.status" />}
          name="serialStatus.value"
          required
          validate={requiredValidator}
        />
      </Col>
      <Col xs={6}>
        <Field
          component={TextArea}
          fullWidth
          id="serials-description"
          label={
            <FormattedMessage id="ui-serials-management.serials.description" />
          }
          name="description"
          parse={(v) => v}
        />
      </Col>
    </Row>
  );
};

export default SerialInfoForm;
