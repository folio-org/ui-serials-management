import refdata from '../refdata';

// TODO This can be added into a single util function with findRefdataValue
const findRefdataCategory = (category) => {
  const refdataCategory = refdata?.find((rdc) => rdc.desc === category);

  if (!refdataCategory) {
    throw new Error(`Refdata value not found for category: ${category}`);
  }

  return refdataCategory;
};

export default findRefdataCategory;

