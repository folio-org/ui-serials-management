import { FieldArray } from 'react-final-form-arrays';
import { FormattedMessage } from 'react-intl';

import { Button } from '@folio/stripes/components';
import { EditCard } from '@folio/stripes-erm-components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import CombinationField from '../CombinationField';

const CombinationFieldArray = () => {
  const { items, onAddField, onDeleteField } =
    useKiwtFieldArray('combination.rules');

  return (
    <>
      <FieldArray name="combination.rules">
        {() => items.map((combination, index) => {
          return (
            <EditCard
              deleteButtonTooltipText={
                <FormattedMessage
                  id="ui-serials-management.ruleset.removeCombination"
                  values={{ index: index + 1 }}
                />
                }
              header={
                <FormattedMessage
                  id="ui-serials-management.ruleset.combinationIndex"
                  values={{ index: index + 1 }}
                />
                }
              onDelete={() => onDeleteField(index, combination)}
            >
              <CombinationField
                index={index}
                name="combination.rules"
                omission={combination}
              />
            </EditCard>
          );
        })
        }
      </FieldArray>
      <Button onClick={() => onAddField({})}>
        <FormattedMessage id="ui-serials-management.ruleset.addCombination" />
      </Button>
    </>
  );
};

export default CombinationFieldArray;
