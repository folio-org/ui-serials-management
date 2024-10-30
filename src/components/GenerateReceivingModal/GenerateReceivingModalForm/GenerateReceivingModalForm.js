import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
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

import {
  useCentralOrderingSettings,
  useConsortiumTenants,
} from '@folio/stripes-acq-components';

const propTypes = {
  serial: PropTypes.object,
  locations: PropTypes.arrayOf(PropTypes.object),
  holdings: PropTypes.arrayOf(PropTypes.object),
};

const GenerateReceivingModalForm = ({
  serial,
  holdings = [],
  locations = [],
}) => {
  const { enabled: isCentralOrderingEnabled } = useCentralOrderingSettings();
  const { tenants: tenantIds } = useConsortiumTenants({
    enabled: isCentralOrderingEnabled,
  });

  const formatDataOptions = () => {
    if (serial?.orderLine?.remoteId_object?.locations?.length) {
      if (!holdings?.length && locations?.length) {
        return serial?.orderLine?.remoteId_object?.locations?.map((e) => {
          const location = locations?.find((l) => e?.locationId === l?.id);
          return { label: location?.name, value: location?.id };
        });
      } else if (locations?.length && holdings?.length) {
        return holdings?.map((h) => {
          const holdingLocation = locations.find(
            (l) => h?.permanentLocationId === l?.id
          );
          return {
            label: `${holdingLocation?.name} > ${h?.callNumber}`,
            value: h?.id,
          };
        });
      }
    }
    return [];
  };

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
        {serial?.orderLine?.remoteId_object?.physical?.createInventory ===
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
        {!!serial?.orderLine?.remoteId_object?.locations?.length && (
          <Col xs={6}>
            <Field
              component={Select}
              dataOptions={[{ label: '', value: '' }, ...formatDataOptions()]}
              disabled={
                serial?.orderLine?.remoteId_object?.locations?.length === 1
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
      {/* <Row>
        <Col xs={6}>
          <Field
            component={Select}
            dataOptions={[{ label: '', value: '' }, ...formatDataOptions()]}
            disabled={
              serial?.orderLine?.remoteId_object?.locations?.length === 1
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
      </Row> */}
    </>
  );
};

GenerateReceivingModalForm.propTypes = propTypes;

export default GenerateReceivingModalForm;
