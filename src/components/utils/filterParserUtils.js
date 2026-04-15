/**
 * Parse selected filter values from activeFilters object
 * Handles multiple filter formats for backward compatibility:
 * - Direct property: activeFilters[name]
 * - State property: activeFilters.state[name]
 * - Filter string: activeFilters.string with "prefix.value" format
 *
 * @param {Object} activeFilters - The active filters object
 * @param {string} name - The filter name property (e.g., 'serialStatus', 'modelRulesetStatus')
 * @param {string} prefix - The filter string prefix (e.g., 'serialStatus', 'modelRulesetStatus')
 * @returns {Array<string>} Array of selected filter values as strings
 */
export const getSelectedValues = (activeFilters = {}, name, prefix) => {
  // Try direct property first
  const activeValue = activeFilters?.[name];
  if (Array.isArray(activeValue)) return activeValue.map((v) => String(v));
  if (activeValue) return [String(activeValue)];

  // Fallback to state property
  const stateValue = activeFilters?.state?.[name];
  if (Array.isArray(stateValue)) return stateValue.map((v) => String(v));
  if (stateValue) return [String(stateValue)];

  // Fallback to filter string format
  const filterString = activeFilters?.string || '';
  if (!filterString) return [];

  return filterString
    .split(',')
    .filter((f) => f.startsWith(`${prefix}.`))
    .map((f) => f.replace(`${prefix}.`, ''));
};
