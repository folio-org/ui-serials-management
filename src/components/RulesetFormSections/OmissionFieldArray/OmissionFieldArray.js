import { FieldArray } from 'react-final-form-arrays';
import { useFormState } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import { Button } from '@folio/stripes/components';
import { EditCard } from '@folio/stripes-erm-components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import OmissionField from '../OmissionField';

const OmissionFieldArray = () => {
  const { values } = useFormState();
  const { items, onAddField, onDeleteField } =
    useKiwtFieldArray('omission.rules');

  return (
    <>
      <FieldArray name="omission.rules">
        {() => items.map((omission, index) => {
          return (
            <EditCard
              deleteButtonTooltipText={
                <FormattedMessage
                  id="ui-serials-management.ruleset.removeOmission"
                  values={{ index: index + 1 }}
                />
                }
              header={
                <FormattedMessage
                  id="ui-serials-management.ruleset.omissionIndex"
                  values={{ index: index + 1 }}
                />
                }
              onDelete={() => onDeleteField(index, omission)}
            >
              <OmissionField
                index={index}
                name="omission.rules"
                omission={omission}
              />
            </EditCard>
          );
        })
        }
      </FieldArray>
      <Button disabled={values?.combination} onClick={() => onAddField({})}>
        <FormattedMessage id="ui-serials-management.ruleset.addOmission" />
      </Button>
    </>
  );
};

export default OmissionFieldArray;
