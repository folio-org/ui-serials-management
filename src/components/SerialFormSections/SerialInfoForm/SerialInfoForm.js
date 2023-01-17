import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import {
  Row,
  Col,
  TextArea,
  Select,
} from '@folio/stripes/components';

import { useSerialsManagementRefdata, selectifyRefdata } from '../../utils';

const [SERIAL_STATUS] = ['Serial.SerialStatus'];

const SerialInfoForm = () => {
  const refdataValues = useSerialsManagementRefdata([SERIAL_STATUS]);
  const statusValues = selectifyRefdata(refdataValues, SERIAL_STATUS);

  return (
    <Row>
      <Col xs={6}>
        <Field
          component={TextArea}
          fullWidth
          label={
            <FormattedMessage id="ui-serials-management.serials.description" />
          }
          name="description"
          parse={(v) => v}
        />
      </Col>
      <Col xs={3}>
        <Field
          component={Select}
          dataOptions={[{ value: '', label: '' }, ...statusValues]}
          label={<FormattedMessage id="ui-serials-management.serials.status" />}
          name="serialStatus.id"
        />
      </Col>
    </Row>
  );
};

export default SerialInfoForm;
