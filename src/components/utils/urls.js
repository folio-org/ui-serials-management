const urls = {
  serials: () => '/serials-management/serials',
  serialCreate: () => '/serials-management/serials/create',

  expectedPieces: () => '/serials-management/expectedPieces',
  patterns: () => '/serials-management/patterns',

  inventoryView: (id) => `/inventory/view/${id}`,
  poLineView: (id) => `/orders/lines/view/${id}`,
  organisationView: (id) => `/organizations/view/${id}`,
  fundView: (id) => `/finance/fund/view/${id}`
};

export default urls;
