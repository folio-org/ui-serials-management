const focusSASQSearchField = (name) => {
  // Uses DOM manipulation to find the search field element of the sasqroute component
  // Format for this element is "sasq-search-field-${SASQ NAME PROP}"
  document.getElementById(`sasq-search-field-${name}`)?.focus();
};

export default focusSASQSearchField;
