import { Field } from 'react-final-form';
import POLineLookup from '../POLineLookup';

const POLineForm = () => {
  const onPOLineSelected = (poLine) => {
    console.log(poLine);
  };

  return (
    <Field
      component={POLineLookup}
      id="po-line-field"
      name="poLine"
      onResourceSelected={onPOLineSelected}
    />
  );
};

export default POLineForm;
