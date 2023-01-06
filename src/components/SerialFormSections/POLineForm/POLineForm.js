import { Field, useFormState, useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { Row, Col, KeyValue } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import { urls } from '../../utils';
import POLineLookup from '../POLineLookup';

const POLineForm = () => {
  const { values } = useFormState();
  const { change } = useForm();
  const onPOLineSelected = (poLine) => {
    change('poLine', poLine[0]);
    console.log(poLine[0]);
  };

  return (
    <Field name="poLine">
      {({ input }) => {
        return (
          <POLineLookup
            id="po-line-field"
            input={input}
            onResourceSelected={onPOLineSelected}
            resource={values?.poLine}
          >
            <Row>
              <Col xs={12}>
                <KeyValue
                  label={<FormattedMessage id="ui-serials-management.poLine.title" />}
                  value={values?.poLine?.titleOrPackage}
                />
                {values?.poLine?.instanceId && (
                  <AppIcon app="inventory" iconKey="instance" size="small">
                    <Link to={urls.inventoryView(values?.poLine.instanceId)}>
                      <FormattedMessage id="ui-serials-management.poLine.viewInInventory" />
                    </Link>
                  </AppIcon>
                )}
              </Col>
            </Row>
          </POLineLookup>
        );
      }}
    </Field>
  );
};

export default POLineForm;
