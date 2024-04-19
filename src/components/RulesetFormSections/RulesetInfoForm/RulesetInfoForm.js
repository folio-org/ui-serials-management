import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import { Row, Col, TextArea, Select } from '@folio/stripes/components';

import {
  requiredValidator,
  selectifyRefdata,
} from '@folio/stripes-erm-components';
import { useSerialsManagementRefdata } from '../../utils';

const [RULESET_STATUS] = ['SerialRuleset.RulesetStatus'];

const RulesetInfoForm = () => {
  const refdataValues = useSerialsManagementRefdata([RULESET_STATUS]);

  return (
    <Row>
      <Col xs={3}>
        <Field
          autoFocus
          component={Select}
          dataOptions={[
            { value: '', label: '' },
            ...selectifyRefdata(refdataValues, RULESET_STATUS, 'value'),
          ]}
          label={<FormattedMessage id="ui-serials-management.status" />}
          name="rulesetStatus.value"
          required
          validate={requiredValidator}
        />
      </Col>
      <Col xs={6}>
        <Field
          component={TextArea}
          fullWidth
          label={<FormattedMessage id="ui-serials-management.description" />}
          name="description"
          parse={(v) => v}
        />
      </Col>
    </Row>
  );
};

export default RulesetInfoForm;
