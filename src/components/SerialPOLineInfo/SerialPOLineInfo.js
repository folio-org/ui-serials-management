import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { Col, Row, KeyValue, Loading } from '@folio/stripes/components';

import {
  useOrder,
  useVendor,
  useMaterialType,
  useIdentifierTypes,
  useAcqUnits,
} from '../../hooks';
import { urls } from '../utils';

const propTypes = {
  orderLine: PropTypes.object,
};

const SerialPOLineInfo = ({ orderLine }) => {
  const { isLoading: orderLoading, data: order } = useOrder(
    orderLine?.purchaseOrderId
  );

  const { isLoading: vendorLoading, data: vendor } = useVendor(order?.vendor);

  const { isLoading: materialTypeLoading, data: materialType } =
    useMaterialType(orderLine?.physical?.materialType);

  const { isLoading: identifierTypeLoading, data: identifierTypes } =
    useIdentifierTypes(
      orderLine?.details?.productIds?.map((e) => e?.productIdType)
    );

  const { isLoading: acqUnitsLoading, data: acqUnits } = useAcqUnits(
    order?.acqUnitIds
  );

  const renderIdentifierTypes = () => {
    if (identifierTypes?.length && !identifierTypeLoading) {
      return orderLine?.details?.productIds?.map((type) => {
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

  return (
    <>
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
              orderLine.details?.productIds?.length && renderIdentifierTypes()
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
            label={<FormattedMessage id="ui-serials-management.poLine.funds" />}
            value={
              orderLine.fundDistribution?.length
                ? orderLine.fundDistribution.map((fund) => {
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
            value={materialTypeLoading ? <Loading /> : materialType?.name}
          />
        </Col>
      </Row>
    </>
  );
};

SerialPOLineInfo.propTypes = propTypes;

export default SerialPOLineInfo;
