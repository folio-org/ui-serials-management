import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Field, useForm, useFormState } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import { requiredValidator } from '@folio/stripes-erm-components';

import {
  Row,
  Col,
  TextField,
  InfoPopover,
  Select,
  Checkbox,
} from '@folio/stripes/components';

const propTypes = {
  orderLine: PropTypes.object,
  locations: PropTypes.arrayOf(PropTypes.object),
  holdings: PropTypes.arrayOf(PropTypes.object),
  tenants: PropTypes.arrayOf(PropTypes.object),
};

const GenerateReceivingModalForm = ({
  orderLine,
  holdings = [],
  locations = [],
  tenants = [],
}) => {
  const { values } = useFormState();
  const { change, batch } = useForm();

  // Figuring out what locations/holdings go into the location/holding field
  const locationsDataOptions = useMemo(() => {
    // If there are locations associated with a POL
    // And none of these are holdings
    if (!holdings?.length && locations?.length > 0) {
      // Data options should be an array of matched locations
      return (
        locations
          // if there are tenants, assume this is an ECS environment and also filter for matching tenantIds from the receivingTenantId field
          ?.filter((l) => (tenants?.length > 0
            ? l?.tenantId === values?.receivingTenantId
            : true))
          // Format into select field array format
          ?.map((fl) => ({ label: fl?.name, value: fl?.id }))
      );

      // If both holdings and locations exist associated with the POL
      // Data options should be the location, concatenated with the holding call number
    } else if (locations?.length > 0 && holdings?.length > 0) {
      return (
        holdings
          // if there are tenants, assume this is an ECS environment and also filter for matching tenantIds from the receivingTenantId field
          ?.filter((h) => (tenants?.length > 0
            ? h?.tenantId === values?.receivingTenantId
            : true))
          // Format into select field array format, also grabbing the location name from holdings associated location
          ?.map((fh) => {
            const holdingLocation = locations.find(
              (l) => fh?.permanentLocationId === l?.id
            );
            return {
              label: fh?.callNumber
                ? `${holdingLocation?.name} > ${fh?.callNumber}`
                : `${holdingLocation?.name}`,
              value: fh?.id,
            };
          })
      );
    }
    return [];
  }, [holdings, locations, tenants?.length, values?.receivingTenantId]);

  const affiliationDataOptions = useMemo(() => {
    return tenants?.map((t) => ({
      label: t?.code,
      value: t?.id,
    }));
  }, [tenants]);

  const affiliationOnChange = (e) => {
    if (holdings?.length > 0) {
      // Could do this onChange as we normally do but testing this
      // Is there a reason we never really use batch for multiple change calls?
      batch(() => {
        change('receivingTenantId', e?.target?.value);
        change('holdingId', undefined);
      });
    } else {
      batch(() => {
        change('receivingTenantId', e?.target?.value);
        change('locationId', undefined);
      });
    }
  };

  return (
    <>
      <Row>
        <Col xs={6}>
          <Field
            component={TextField}
            id="interval-field"
            label={
              <>
                <FormattedMessage id="ui-serials-management.pieceSets.timeBetweenPublicationAndReceipt" />
                <InfoPopover
                  content={
                    <FormattedMessage id="ui-serials-management.pieceSets.timeBetweenPublicationAndReceiptPopover" />
                  }
                />
              </>
            }
            name="interval"
            required
            type="number"
            validate={requiredValidator}
          />
        </Col>
        <Col xs={6}>
          <Field
            component={Select}
            dataOptions={[{ label: 'Physical', value: 'Physical' }]}
            disabled
            label={
              <FormattedMessage id="ui-serials-management.pieceSets.pieceFormat" />
            }
            name="format"
          />
        </Col>
      </Row>
      <Row>
        <Col md={3} xs={6}>
          <Field
            component={Checkbox}
            fullWidth
            label={
              <>
                <FormattedMessage id="ui-serials-management.pieceSets.supplement" />
                <InfoPopover
                  content={
                    <FormattedMessage id="ui-serials-management.pieceSets.supplementPopover" />
                  }
                  id="supplement-tooltip"
                />
              </>
            }
            name="supplement"
            type="checkbox"
            vertical
          />
        </Col>
        {orderLine?.remoteId_object?.physical?.createInventory ===
          'Instance, Holding, Item' && (
          <Col md={3} xs={6}>
            <Field
              component={Checkbox}
              fullWidth
              label={
                <FormattedMessage id="ui-serials-management.pieceSets.createItem" />
              }
              name="createItem"
              type="checkbox"
              vertical
            />
          </Col>
        )}
        {!!holdings?.length && (
          <>
            <Col md={3} xs={6}>
              <Field
                component={Checkbox}
                fullWidth
                label={
                  <>
                    <FormattedMessage id="ui-serials-management.pieceSets.displayInHolding" />
                    <InfoPopover
                      content={
                        <FormattedMessage id="ui-serials-management.pieceSets.displayInHoldingPopover" />
                      }
                      id="display-on-holding-tooltip"
                    />
                  </>
                }
                name="displayOnHolding"
                type="checkbox"
                vertical
              />
            </Col>
            <Col md={3} xs={6}>
              <Field
                component={Checkbox}
                fullWidth
                label={
                  <FormattedMessage id="ui-serials-management.pieceSets.displayToPublic" />
                }
                name="displayToPublic"
                type="checkbox"
                vertical
              />
            </Col>
          </>
        )}
      </Row>
      <Row>
        {!!tenants?.length && (
          <Col xs={6}>
            <Field
              component={Select}
              dataOptions={[
                { label: '', value: '' },
                ...affiliationDataOptions,
              ]}
              disabled={orderLine?.remoteId_object?.locations?.length === 1}
              label={
                <FormattedMessage id="ui-serials-management.pieceSets.affiliation" />
              }
              name="receivingTenantId"
              onChange={(e) => affiliationOnChange(e)}
              required
              validate={requiredValidator}
            />
          </Col>
        )}
        {!!orderLine?.remoteId_object?.locations?.length && (
          <Col xs={6}>
            <Field
              component={Select}
              dataOptions={[{ label: '', value: '' }, ...locationsDataOptions]}
              disabled={
                orderLine?.remoteId_object?.locations?.length === 1 ||
                (tenants?.length > 0 && !values?.receivingTenantId)
              }
              label={
                holdings?.length ? (
                  <FormattedMessage id="ui-serials-management.pieceSets.holding" />
                ) : (
                  <FormattedMessage id="ui-serials-management.pieceSets.location" />
                )
              }
              name={holdings?.length ? 'holdingId' : 'locationId'}
              required
              validate={requiredValidator}
            />
          </Col>
        )}
      </Row>
    </>
  );
};

GenerateReceivingModalForm.propTypes = propTypes;

export default GenerateReceivingModalForm;
