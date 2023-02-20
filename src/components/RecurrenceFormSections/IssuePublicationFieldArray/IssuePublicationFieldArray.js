import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { Field, useFormState } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {

  Col,
  IconButton,
  Label,
  Row,
  TextField,
  Tooltip,
} from '@folio/stripes/components';
import {
  requiredValidator,
} from '@folio/stripes-erm-components';

const IssuePublicationFieldArray = () => {
  const { values } = useFormState();

  const initialValue = useMemo(
    () => Array(Number(values?.recurrence?.issues || 0)).fill({
      pattern: {
        day: null,
        week: null,
        month: null,
        year: null,
      },
    }),
    [values?.recurrence?.issues]
  );

  return (
    <FieldArray initialValue={initialValue} name="rules">
      {({ fields }) => fields.map((name, index) => {
        return (
          <Row key={name + index}>
            <Col xs={1}>
              <Label style={{ paddingTop: '25px' }}>
                <FormattedMessage
                  id="ui-serials-management.recurrence.issueIndex"
                  values={{ index: index + 1 }}
                />
              </Label>
            </Col>
            <Col xs={2}>
              <Field
                component={TextField}
                label={
                  <FormattedMessage id="ui-serials-management.recurrence.day" />
                  }
                name={`${name}.pattern.day`}
                required
                type="number"
                validate={requiredValidator}
              />
            </Col>
            <Col xs={2}>
              <Field
                component={TextField}
                label={
                  <FormattedMessage id="ui-serials-management.recurrence.ofWeek" />
                  }
                name={`${name}.pattern.week`}
                required
                type="number"
              />
            </Col>
            <Col xs={2}>
              <Field
                component={TextField}
                label={
                  <FormattedMessage id="ui-serials-management.recurrence.ofMonth" />
                  }
                name={`${name}pattern.month`}
              />
            </Col>
            <Col xs={2}>
              <Field
                component={TextField}
                label={
                  <FormattedMessage id="ui-serials-management.recurrence.ofYear" />
                  }
                name={`${name}.pattern.year`}
              />
            </Col>
            <Col xs={1}>
              <Tooltip
                id={`payer-${index + 1}-trash-button-tooltip`}
                text={
                  <FormattedMessage
                    id="ui-oa.charge.removePayerIndex"
                    values={{ index: index + 1 }}
                  />
                  }
              >
                {({ ref, ariaIds }) => (
                  <IconButton
                    ref={ref}
                    aria-describedby={ariaIds.sub}
                    aria-labelledby={ariaIds.text}
                    icon="trash"
                    onClick={() => fields.remove(index)}
                    style={{ paddingTop: '25px' }}
                  />
                )}
              </Tooltip>
            </Col>
          </Row>
        );
      })
      }
    </FieldArray>
  );
};

export default IssuePublicationFieldArray;
