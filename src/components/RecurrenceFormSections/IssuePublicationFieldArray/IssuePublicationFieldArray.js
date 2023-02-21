import { useMemo } from 'react';

import { useFormState } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import IssuePublicationField from '../IssuePublicationField';

const IssuePublicationFieldArray = () => {
  const { values } = useFormState();

  const initialValue = useMemo(
    () => Array(Number(values?.recurrence?.issues || 0)).fill({}),
    [values?.recurrence?.issues]
  );

  return (
    <FieldArray initialValue={initialValue} name="recurrence.rules">
      {({ fields }) => fields.map((name, index) => {
        return (
          <IssuePublicationField
            fields={fields}
            index={index}
            name={name}
            patternType={values?.patternType}
          />
        );
      })
      }
    </FieldArray>
  );
};

export default IssuePublicationFieldArray;
