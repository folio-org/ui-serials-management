import refdata from '../refdata';

// Used for searching refdata resource and finding refdata value from supplied category and value
const findRefdataValue = (category, value) => {
  const refdataValue = refdata
    ?.find((rdc) => rdc.desc === category)
    ?.values?.find((rdv) => rdv?.value === value);

  if (!refdataValue) {
    throw new Error(
      `Refdata value not found for category: ${category}, value: ${value}`
    );
  }

  return refdataValue;
};

export default findRefdataValue;
