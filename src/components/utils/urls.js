const urls = {
  serials: () => '/serials-management/serials',
  serialView: (id) => `/serials-management/serials/${id}`,
  serialCreate: () => '/serials-management/serials/create',
  serialEdit: (id) => `/serials-management/serials/${id}/edit`,

  rulesetView: (sid, rid) => `/serials-management/serials/${sid}/rulesets/${rid}`,
  rulesetCreate: (id) => `/serials-management/serials/${id}/rulesets/create`,

  pieceSets: () => '/serials-management/pieceSets',
  pieceSetView: (id) => `/serials-management/pieceSets/${id}`,

  inventoryView: (id) => `/inventory/view/${id}`,
  poLineView: (id) => `/orders/lines/view/${id}`,
  organisationView: (id) => `/organizations/view/${id}`,
  fundView: (id) => `/finance/fund/view/${id}`,
  receivingView: (id) => `/receiving/${id}/view`,
};

export default urls;
