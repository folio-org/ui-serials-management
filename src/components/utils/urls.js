const urls = {
  serials: () => '/serials-management/serials',
  serialView: (id) => `/serials-management/serials/${id}`,
  serialCreate: () => '/serials-management/serials/create',
  serialEdit: (id) => `/serials-management/serials/${id}/edit`,

  rulesetCreate: (id) => `/serials-management/serials/${id}/rulesets/create`,

  expectedPieces: () => '/serials-management/expectedPieces',
  patterns: () => '/serials-management/patterns',

  inventoryView: (id) => `/inventory/view/${id}`,
  poLineView: (id) => `/orders/lines/view/${id}`,
  organisationView: (id) => `/organizations/view/${id}`,
  fundView: (id) => `/finance/fund/view/${id}`
};

export default urls;
