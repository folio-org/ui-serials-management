import { useState } from 'react';

export const useModelRuleset = () => {
  const [selectedModelRuleset, setSelectedModelRuleset] = useState();

  const handleSelectModelRuleset = (modelRuleset) => {
    setSelectedModelRuleset(modelRuleset);
  };

  return { selectedModelRuleset, handleSelectModelRuleset };
};

export default useModelRuleset;
