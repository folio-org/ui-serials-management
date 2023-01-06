import { Field, useFormState, useForm } from 'react-final-form';
import POLineLookup from '../POLineLookup';

const POLineForm = () => {
  const { values } = useFormState();
  const { change } = useForm();
  const onPOLineSelected = (poLine) => {
    change('poLine', poLine[0]);
    console.log(poLine[0]);
  };

  return (
    <Field name="poLine">
      {({ input }) => {
        return (
          <POLineLookup
            id="po-line-field"
            input={input}
            onResourceSelected={onPOLineSelected}
            resource={values?.poLine}
          >
            Linked
          </POLineLookup>
        );
      }}
    </Field>
  );
};

export default POLineForm;
