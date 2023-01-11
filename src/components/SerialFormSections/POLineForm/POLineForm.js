import { Field, useFormState, useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { Row, Col, KeyValue, Loading } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import { urls } from '../../utils';
import POLineLookup from '../POLineLookup';
import {
  useOrder,
  useVendor,
  useMaterialType,
  useIdentifierTypes,
} from '../../../hooks';

const POLineForm = () => {
  const { values } = useFormState();
  const { change } = useForm();

  const { isLoading: orderLoading, data: order } = useOrder(
    values?.poLine?.purchaseOrderId
  );
  const { isFetching: vendorLoading, data: vendor } = useVendor(order?.vendor);

  const { isLoading: materialTypeLoading, data: materialType } =
    useMaterialType(values?.poLine?.physical?.materialType);

  const { isLoading: identifierTypeLoading, data: identifierTypes } =
    useIdentifierTypes(
      values?.poLine?.details?.productIds?.map((e) => e?.productIdType)
    );

  const onPOLineSelected = (poLine) => {
    change('poLine', poLine[0]);
    console.log(poLine[0]);
  };

  const renderIdentifierTypes = () => {
    if (identifierTypes?.length && !identifierTypeLoading) {
      return identifierTypes?.map((type) => {
        return (
          <li key={type?.id}>
            {type?.name + ': '}
            {
              values?.poLine?.details?.productIds?.find(
                (e) => e?.productIdType === type?.id
              )?.productId
            }
          </li>
        );
      });
    } else {
      return <Loading />;
    }
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
                    <FormattedMessage id="ui-serials-management.poLine.productIds" />
                  }
                  value={
                    // Add Loading
                    values?.poLine?.details?.productIds?.length
                      ? renderIdentifierTypes()
                      : null
                  }
                />
              </Col>
              <Col xs={3}>
                <KeyValue
                  label={
                    <FormattedMessage id="ui-serials-management.poLine.vendor" />
                  }
                  value={
                    vendorLoading || orderLoading ? (
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
                  value={
                    values?.poLine?.fundDistribution.length
                      ? values?.poLine?.fundDistribution.map((fund) => {
                        return (
                          <li key={fund?.id}>
                            <Link to={urls.fundView(fund?.id)}>
                              {fund?.code}
                            </Link>
                          </li>
                        );
                      })
                      : null
                  }
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
