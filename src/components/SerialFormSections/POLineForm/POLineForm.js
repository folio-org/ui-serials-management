import { useEffect } from 'react';
import { Field, useFormState, useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import isEqual from 'lodash/isEqual';

import { Row, Col, KeyValue } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import { Typedown } from '@k-int/stripes-kint-components';
import { requiredValidator } from '@folio/stripes-erm-components';

import SerialPOLineInfo from '../../SerialPOLineInfo';
import POLineLookup from '../POLineLookup';
import { useTitles } from '../../../hooks';
import { urls } from '../../utils';

const POLineForm = () => {
  const { values } = useFormState();
  const { change } = useForm();

  const { isLoading: titlesLoading, data: titles } = useTitles(
    values?.orderLine?.id
  );

  // istanbul ignore next
  useEffect(() => {
    if (
      values?.orderLine &&
      !titlesLoading &&
      titles?.titles?.length === 1
    ) {
      const titleObj = { id: titles.titles[0].id, title: titles.titles[0].title };
      if (!isEqual(values.orderLine?.titleObject, titleObj)) {
        // Ensure same shape as initialValues -- THIS IS FLAKY -- WE SHOULD BE DOING SOMETHING CLEVERER HERE
        // Don't use form state here mabe, track this kind of extra difference through our own state? -- Investigate
        change('orderLine.titleObject', titleObj);
      }
    }
  }, [change, titles?.titles, titlesLoading, values?.orderLine, values?.title]);

  // istanbul ignore next
  const removePOLine = () => {
    change('orderLine', undefined);
  };

  const onPOLineSelected = (poLine) => {
    change('orderLine', poLine[0]);
  };

  const renderListItem = (option) => {
    return <>{option?.title}</>;
  };

  const formattedDataOptions = titles?.titles?.map((e) => {
    return { title: e?.title, id: e?.id };
  });

  return (
    <>
      <Field name="orderLine">
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
              <SerialPOLineInfo orderLine={values?.orderLine} />
            </POLineLookup>
          );
        }}
      </Field>
      <Row start="xs">
        <Col xs={12}>
          {titles?.titles?.length > 1 && (
            // istanbul ignore next
            <Field
              component={Typedown}
              dataOptions={formattedDataOptions}
              filterPath="label"
              label={
                <FormattedMessage id="ui-serials-management.ruleset.title" />
              }
              name="orderLine.titleObject"
              renderListItem={renderListItem}
              required
              uniqueIdentificationPath="id"
              validate={requiredValidator}
            />
          )}
          {titles?.titles?.length === 1 && (
            <KeyValue
              label={
                <FormattedMessage id="ui-serials-management.ruleset.title" />
              }
            >
              {titles?.titles[0]?.instanceId ? (
                <AppIcon app="inventory" iconKey="instance" size="small">
                  <Link to={urls.inventoryView(titles?.titles[0]?.instanceId)}>
                    {titles?.titles[0]?.title}
                  </Link>
                </AppIcon>
              ) : (
                <>{titles?.titles[0]?.title}</>
              )}
            </KeyValue>
          )}
        </Col>
      </Row>
    </>
  );
};

export default POLineForm;
