import { FieldArray } from 'react-final-form-arrays';
import { FormattedMessage } from 'react-intl';

import { Button } from '@folio/stripes/components';
import { EditCard } from '@folio/stripes-erm-components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import OmissionField from '../OmissionField';

const OmissionFieldArray = () => {
  const { items, onAddField, onDeleteField } = useKiwtFieldArray('omissions');

  return (
    <>
      <FieldArray name="omissions">
        {() => items.map((omission, index) => {
          return (
            <EditCard
              deleteButtonTooltipText={
                <FormattedMessage
                  id="ui-serials-management.omissions.removeOmission"
                  values={{ index: index + 1 }}
                />
                }
              header={
                <FormattedMessage
                  id="ui-serials-management.omissions.omissionIndex"
                  values={{ index: index + 1 }}
                />
                }
              onDelete={() => onDeleteField(index, omission)}
            >
              <OmissionField
                index={index}
                name="omissions"
                omission={omission}
              />
            </EditCard>
          );
        })
        }
      </FieldArray>
      <Button onClick={() => onAddField({})}>
        <FormattedMessage id="ui-serials-management.omissions.addOmission" />
      </Button>
    </>
  );
};

export default OmissionFieldArray;
