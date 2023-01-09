import { Field, useFormState, useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { Row, Col, KeyValue, Loading } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import { urls } from '../../utils';
import POLineLookup from '../POLineLookup';
import { useOrder, useVendor, useMaterialType } from '../../../hooks';

const POLineForm = () => {
  const { values } = useFormState();
  const { change } = useForm();

  const { isLoading: orderLoading, data: order } = useOrder(
    values?.poLine?.purchaseOrderId
  );
  const { isLoading: vendorLoading, data: vendor } = useVendor(order?.vendor);

  const { isLoading: materialTypeLoading, data: materialType } =
    useMaterialType(values?.poLine?.physical?.materialType);

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
                  label={
                    <FormattedMessage id="ui-serials-management.poLine.title" />
                  }
                  value={values?.poLine?.titleOrPackage}
                />
                <AppIcon app="inventory" iconKey="instance" size="small">
                  <Link to={urls.inventoryView(values?.poLine?.instanceId)}>
                    <FormattedMessage id="ui-serials-management.poLine.viewInInventory" />
                  </Link>
                </AppIcon>
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs={3}>
                <KeyValue
                  label={
                    <FormattedMessage id="ui-serials-management.poLine.orderNumber" />
                  }
                  value={orderLoading ? <Loading /> : order?.poNumber}
                />
              </Col>
              <Col xs={3}>
                <KeyValue
                  label={
                    <FormattedMessage id="ui-serials-management.poLine.orderStatus" />
                  }
                  value={orderLoading ? <Loading /> : order?.workflowStatus}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <KeyValue
                  label={
                    <FormattedMessage id="ui-serials-management.poLine.vendor" />
                  }
                  value={
                    vendorLoading ? (
                      <Loading />
                    ) : (
                      <Link to={urls.organisationView(vendor?.id)}>
                        {vendor?.name + ' (' + vendor?.code + ')'}
                      </Link>
                    )
                  }
                />
              </Col>
              <Col xs={3}>
                <KeyValue
                  label={
                    <FormattedMessage id="ui-serials-management.poLine.funds" />
                  }
                  value={values?.poLine?.fundDistribution.map((fund) => {
                    return (
                      <li>
                        <Link to={urls.fundView(fund?.id)}>{fund?.code}</Link>
                      </li>
                    );
                  })}
                />
              </Col>
              <Col xs={3}>
                <KeyValue
                  label={
                    <FormattedMessage id="ui-serials-management.poLine.materialType" />
                  }
                  value={materialTypeLoading ? <Loading /> : materialType?.name}
                />
              </Col>
            </Row>
          </POLineLookup>
        );
      }}
    </Field>
  );
};

export default POLineForm;
