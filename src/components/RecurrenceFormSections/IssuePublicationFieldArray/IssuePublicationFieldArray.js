import { useMemo } from 'react';

import { useFormState } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import IssuePublicationField from '../IssuePublicationField';

const IssuePublicationFieldArray = () => {
  const { values } = useFormState();
  const { items } = useKiwtFieldArray('recurrence.rules');

  // const initialValue = useMemo(
  //   () => Array(Number(values?.recurrence?.issues || 0)).fill({}),
  //   [values?.recurrence?.issues]
  // );

  return (
    <FieldArray name="recurrence.rules">
      {() => items.map((issue, index) => {
        return (
          <IssuePublicationField
            index={index}
            issue={issue}
            name="recurrence.rules"
            patternType={values?.patternType}
          />
        );
      })}
    </FieldArray>
  );
};

export default IssuePublicationFieldArray;
