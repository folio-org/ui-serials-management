import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Field, useFormState } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import { requiredValidator } from '@folio/stripes-erm-components';

import {
  Row,
  Col,
  TextField,
  InfoPopover,
  Select,
  Checkbox,
  Label,
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
  const filteredLocations = useMemo(() => {
    return orderLine?.remoteId_object?.locations?.map((e) => {
      const location = locations?.find((l) => e?.locationId === l?.id);
      return location;
    }) || [];
  }, [locations, orderLine?.remoteId_object?.locations]);

  const filteredHoldings = useMemo(() => {
    return holdings?.map((h) => {
      const holdingLocation = locations.find(
        (l) => h?.permanentLocationId === l?.id
      );
      return { ...h, holdingLocationName: holdingLocation?.name };
    });
  }, [holdings, locations]);


  const locationsDataOptions = useMemo(() => {
    // If there are locations associated with a POL
    if (orderLine?.remoteId_object?.locations?.length > 0) {
      // And none of these are holdings
      if (!holdings?.length && locations?.length > 0) {
        // Data options should be an array of matched locations
        return orderLine?.remoteId_object?.locations?.map((e) => {
          const location = locations?.find((l) => e?.locationId === l?.id);
          return { label: location?.name, value: location?.id };
        });
        // If both holdings and locations exist associated with the POL
        // Data options should be the location, concatenated with the holding call number
      } else if (locations?.length > 0 && holdings?.length > 0) {
        return holdings?.map((h) => {
          const holdingLocation = locations.find(
            (l) => h?.permanentLocationId === l?.id
          );
          return {
            label: h?.callNumber
              ? `${holdingLocation?.name} > ${h?.callNumber}`
              : `${holdingLocation?.name}`,
            value: h?.id,
          };
        });
      }
    }
    return [];
  }, [holdings, locations, orderLine?.remoteId_object?.locations]);

  return (
    <>
      <Row>
        <Col xs={6}>
          <Field
            component={TextField}
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
            dataOptions={[{ label: '', value: '' }]}
            label={
              <FormattedMessage id="ui-serials-management.pieceSets.affiliation" />
            }
            name="receivingTenantId"
            required
            validate={requiredValidator}
          />
        </Col>
      </Row>
      <Row>
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
        <Col xs={3}>
          <Label>
            <FormattedMessage id="ui-serials-management.pieceSets.supplement" />
            <InfoPopover
              content={
                <FormattedMessage id="ui-serials-management.pieceSets.supplementPopover" />
              }
              id="supplement-tooltip"
            />
          </Label>
          <FormattedMessage id="ui-serials-management.pieceSets.supplement">
            {([ariaLabel]) => (
              <Field
                aria-label={ariaLabel}
                component={Checkbox}
                name="supplement"
                type="checkbox"
              />
            )}
          </FormattedMessage>
        </Col>
        {orderLine?.remoteId_object?.physical?.createInventory ===
          'Instance, Holding, Item' && (
          <Col xs={3}>
            <Label>
              <FormattedMessage id="ui-serials-management.pieceSets.createItem" />
            </Label>
            <FormattedMessage id="ui-serials-management.pieceSets.createItem">
              {([ariaLabel]) => (
                <Field
                  aria-label={ariaLabel}
                  component={Checkbox}
                  name="createItem"
                  type="checkbox"
                />
              )}
            </FormattedMessage>
          </Col>
        )}
      </Row>
      <Row>
        {!!orderLine?.remoteId_object?.locations?.length && (
          <Col xs={6}>
            <Field
              component={Select}
              dataOptions={[{ label: '', value: '' }, ...locationsDataOptions]}
              disabled={orderLine?.remoteId_object?.locations?.length === 1}
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
        {!!holdings?.length && (
          <>
            <Col xs={3}>
              <Label>
                <FormattedMessage id="ui-serials-management.pieceSets.displayInHolding" />
                <InfoPopover
                  content={
                    <FormattedMessage id="ui-serials-management.pieceSets.displayInHoldingPopover" />
                  }
                  id="display-on-holding-tooltip"
                />
              </Label>
              <FormattedMessage id="ui-serials-management.pieceSets.displayInHolding">
                {([ariaLabel]) => (
                  <Field
                    aria-label={ariaLabel}
                    component={Checkbox}
                    name="displayOnHolding"
                    type="checkbox"
                  />
                )}
              </FormattedMessage>
            </Col>
            <Col xs={3}>
              <Label>
                <FormattedMessage id="ui-serials-management.pieceSets.displayToPublic" />
              </Label>
              <FormattedMessage id="ui-serials-management.pieceSets.displayToPublic">
                {([ariaLabel]) => (
                  <Field
                    aria-label={ariaLabel}
                    component={Checkbox}
                    name="displayToPublic"
                    type="checkbox"
                  />
                )}
              </FormattedMessage>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

GenerateReceivingModalForm.propTypes = propTypes;

export default GenerateReceivingModalForm;
