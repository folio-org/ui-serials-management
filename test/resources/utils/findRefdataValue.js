import refdata from '../refdata';

// TODO Maybe have an error that returns:
// {id: MISSING_REFDATA_VALUE_ID, label: MISSING_REFDATA_LABEL, value: MISSING_REFDATA_VALUE }
// For potentially easier debugging

// Used for searching refdata resource and finding refdata value from supplied category and value
const findRefdataValue = (category, value) => {
  return refdata
    ?.find((rdc) => rdc.desc === category)
    ?.values?.find((rdv) => rdv?.value === value);
};

export default findRefdataValue;
