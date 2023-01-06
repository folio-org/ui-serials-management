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
    <Field
      component={POLineLookup}
      id="po-line-field"
      name="poLine"
      onResourceSelected={onPOLineSelected}
      resource={values?.poLine}
    />
  );
};

export default POLineForm;
