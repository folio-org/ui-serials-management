import { useEffect } from 'react';
import { Field, useFormState, useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { Row, Col, KeyValue, Loading } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import { Typedown } from '@k-int/stripes-kint-components';
import { requiredValidator } from '@folio/stripes-erm-components';
import { urls } from '../../utils';
import POLineLookup from '../POLineLookup';
import {
  useOrder,
  useVendor,
  useMaterialType,
  useIdentifierTypes,
  useAcqUnits,
  useTitles,
} from '../../../hooks';

// The card contents within this is a duplicate of the serials PO Line view
// If both are the same contents in the future, this can be moved to seperate component

const POLineForm = () => {
  const { values } = useFormState();
  const { change } = useForm();

  const { isLoading: orderLoading, data: order } = useOrder(
    values?.orderLine?.purchaseOrderId
  );
  const { isLoading: vendorLoading, data: vendor } = useVendor(order?.vendor);

  const { isLoading: materialTypeLoading, data: materialType } =
    useMaterialType(values?.orderLine?.physical?.materialType);

  const { isLoading: identifierTypeLoading, data: identifierTypes } =
    useIdentifierTypes(
      values?.orderLine?.details?.productIds?.map((e) => e?.productIdType)
    );

  const { isLoading: acqUnitsLoading, data: acqUnits } = useAcqUnits(
    order?.acqUnitIds
  );

  const { isLoading: titlesLoading, data: titles } = useTitles(
    values?.orderLine?.id
  );

  useEffect(() => {
    if (values?.orderLine && !titlesLoading) {
      if (values?.title !== titles?.titles[0] && titles?.titles?.length === 1) {
        change('title', titles?.titles[0]);
      }
    }
  }, [change, titles?.titles, titlesLoading, values?.orderLine, values?.title]);

  const removePOLine = () => {
    change('orderLine', undefined);
  };

  const onPOLineSelected = (poLine) => {
    change('orderLine', poLine[0]);
  };

  const renderIdentifierTypes = () => {
    if (identifierTypes?.length && !identifierTypeLoading) {
      return values?.orderLine?.details?.productIds?.map((type) => {
        return (
          <li key={type?.id}>
            {identifierTypes?.find((e) => e?.id === type?.productIdType)?.name +
              ': '}
            {type?.productId}
          </li>
        );
      });
    } else {
      return <Loading />;
    }
  };

  const renderAcqUnits = () => {
    if (acqUnits?.length && !acqUnitsLoading) {
      return acqUnits?.map((unit) => {
        return <li key={unit?.id}>{unit?.name}</li>;
      });
    } else {
      return <Loading />;
    }
  };

  const renderListItem = (title) => {
    return <>{title?.title}</>;
  };

  return (
    <>
      <Field name="orderLine" required validate={requiredValidator}>
        {({ input }) => {
          return (
            <POLineLookup
              id="po-line-field"
              input={input}
              onResourceSelected={onPOLineSelected}
              removePOLine={removePOLine}
              resource={values?.orderLine}
            >
              <Row>
                <Col xs={12}>
                  {values?.orderLine?.isPackage && (
                    <KeyValue
                      label={
                        <FormattedMessage id="ui-serials-management.poLine.package" />
                      }
                      value={values?.orderLine?.titleOrPackage}
                    >
                      {values?.orderLine?.instanceId ? (
                        <AppIcon
                          app="inventory"
                          iconKey="instance"
                          size="small"
                        >
                          <Link
                            to={urls.inventoryView(
                              values?.orderLine?.instanceId
                            )}
                          >
                            {values?.orderLine?.titleOrPackage}
                          </Link>
                        </AppIcon>
                      ) : (
                        <>{values?.orderLine?.titleOrPackage}</>
                      )}
                    </KeyValue>
                  )}
                </Col>
              </Row>
              {/* This conditional is a bit tacky, possible a better way of implementing this */}
              {!!values?.orderLine?.instanceId && <br />}
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
                <Col xs={3}>
                  <KeyValue
                    label={
                      <FormattedMessage id="ui-serials-management.poLine.acqUnits" />
                    }
                    value={
                      order?.acqUnitIds?.length || orderLoading
                        ? renderAcqUnits()
                        : null
                    }
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
                      values?.orderLine?.details?.productIds?.length
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
                      values?.orderLine?.fundDistribution?.length
                        ? values?.orderLine?.fundDistribution.map((fund) => {
                          return (
                            <li key={fund?.id}>
                              <Link to={urls.fundView(fund?.fundId)}>
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
                    value={
                      materialTypeLoading ? <Loading /> : materialType?.name
                    }
                  />
                </Col>
              </Row>
            </POLineLookup>
          );
        }}
      </Field>
      <Row start="xs">
        <Col xs={12}>
          {titles?.titles?.length > 1 && (
            <Field
              component={Typedown}
              dataOptions={titles?.titles}
              filterPath="title"
              label={
                <FormattedMessage id="ui-serials-management.ruleset.title" />
              }
              name="title"
              renderListItem={renderListItem}
              required
              validate={requiredValidator}
            />
          )}
          {titles?.titles?.length === 1 && (
            <>
              <KeyValue
                label={
                  <FormattedMessage id="ui-serials-management.ruleset.title" />
                }
              >
                {titles?.titles[0]?.instanceId ? (
                  <AppIcon app="inventory" iconKey="instance" size="small">
                    <Link
                      to={urls.inventoryView(titles?.titles[0]?.instanceId)}
                    >
                      {titles?.titles[0]?.title}
                    </Link>
                  </AppIcon>
                ) : (
                  <>{titles?.titles[0]?.title}</>
                )}
              </KeyValue>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default POLineForm;
