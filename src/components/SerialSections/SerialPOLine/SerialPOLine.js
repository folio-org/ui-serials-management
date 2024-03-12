import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import {
  Accordion,
  Card,
  Col,
  Row,
  KeyValue,
  Loading,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import {
  useOrder,
  useVendor,
  useMaterialType,
  useIdentifierTypes,
  useAcqUnits,
} from '../../../hooks';
import { urls } from '../../utils';

const propTypes = {
  serial: PropTypes.object,
  id: PropTypes.string,
};

// The card contents within this is a duplicate of the forms PO Line information
// If both are the same contents in the future, this can be moved to seperate component

const SerialPOLine = ({ serial, id }) => {
  const { isLoading: orderLoading, data: order } = useOrder(
    serial?.orderLine?.remoteId_object?.purchaseOrderId
  );

  const { isLoading: vendorLoading, data: vendor } = useVendor(order?.vendor);

  const { isLoading: materialTypeLoading, data: materialType } =
    useMaterialType(serial?.orderLine?.remoteId_object?.physical?.materialType);

  const { isLoading: identifierTypeLoading, data: identifierTypes } =
    useIdentifierTypes(
      serial?.orderLine?.remoteId_object?.details?.productIds?.map(
        (e) => e?.productIdType
      )
    );

  const { isLoading: acqUnitsLoading, data: acqUnits } = useAcqUnits(
    order?.acqUnitIds
  );

  const renderIdentifierTypes = () => {
    if (identifierTypes?.length && !identifierTypeLoading) {
      return serial?.orderLine?.remoteId_object?.details?.productIds?.map(
        (type) => {
          return (
            <li key={type?.id}>
              {identifierTypes?.find((e) => e?.id === type?.productIdType)
                ?.name + ': '}
              {type?.productId}
            </li>
          );
        }
      );
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
  return (
    <Accordion
      id={id}
      label={<FormattedMessage id="ui-serials-management.poLine" />}
    >
      <Card
        cardStyle="positive"
        headerStart={
          <AppIcon app="orders" size="small">
            <Link to={urls.poLineView(serial?.orderLine?.remoteId)}>
              <strong>
                <FormattedMessage id="ui-serials-management.poLine" />
                {': ' + serial?.orderLine?.remoteId_object?.poLineNumber}
              </strong>
            </Link>
          </AppIcon>
        }
        id={id}
        roundedBorder
      >
        <Row>
          <Col xs={12}>
            <KeyValue
              label={
                <FormattedMessage id="ui-serials-management.poLine.title" />
              }
              value={serial?.orderLine?.remoteId_object?.titleOrPackage}
            />
            {!!serial?.orderLine?.remoteId_object?.instanceId && (
              <AppIcon app="inventory" iconKey="instance" size="small">
                <Link
                  to={urls.inventoryView(
                    serial?.orderLine?.remoteId_object?.instanceId
                  )}
                >
                  <FormattedMessage id="ui-serials-management.poLine.viewInInventory" />
                </Link>
              </AppIcon>
            )}
          </Col>
        </Row>
        {/* This conditional is a bit tacky, possible a better way of implementing this */}
        {!!serial?.orderLine?.remoteId_object?.instanceId && <br />}
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
                serial?.orderLine?.remoteId_object?.details?.productIds?.length
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
                serial?.orderLine?.remoteId_object?.fundDistribution?.length
                  ? serial?.orderLine?.remoteId_object?.fundDistribution.map(
                    (fund) => {
                      return (
                        <li key={fund?.id}>
                          <Link to={urls.fundView(fund?.fundId)}>
                            {fund?.code}
                          </Link>
                        </li>
                      );
                    }
                  )
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
      </Card>
    </Accordion>
  );
};

SerialPOLine.propTypes = propTypes;

export default SerialPOLine;
