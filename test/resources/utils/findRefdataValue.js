import refdata from '../refdata';

// Used for searching refdata resource and finding refdata value from supplied category and value
export const findRefdataValue = (category, value) => {
  return refdata
    ?.find((rdc) => rdc.desc === category)
    ?.values?.find((rdv) => rdv?.value === value);
};
