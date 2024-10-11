const deepDeleteKeys = (value, keyArray) => {
  if (Array.isArray(value)) {
    return value.map((i) => deepDeleteKeys(i, keyArray));
  } else if (typeof value === 'object' && value !== null) {
    return Object.keys(value).reduce((newObject, k) => {
      if (keyArray.includes(k)) return newObject;
      return { [k]: deepDeleteKeys(value[k], keyArray), ...newObject };
    }, {});
  }
  return value;
};

export default deepDeleteKeys;
