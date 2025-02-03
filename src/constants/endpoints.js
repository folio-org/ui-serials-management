export const REFDATA_ENDPOINT = 'serials-management/refdata';
export const SETTINGS_ENDPOINT = 'serials-management/settings/appSettings';

export const LOCALES_ENDPOINT = 'serials-management/locales';

export const SERIALS_ENDPOINT = 'serials-management/serials';
export const SERIAL_ENDPOINT = (id) => `serials-management/serials/${id}`;

export const PIECE_SETS_ENDPOINT = 'serials-management/predictedPieces';
export const PIECE_SET_ENDPOINT = (id) => `serials-management/predictedPieces/${id}`;

export const RULESETS_ENDPOINT = 'serials-management/rulesets';
export const RULESET_ENDPOINT = (id) => `serials-management/rulesets/${id}`;
export const REPLACE_AND_DEPRECATE_ENDPOINT = (id) => `serials-management/rulesets/${id}/replaceAndDeprecate`;
export const REPLACE_AND_DELETE_ENDPOINT = (id) => `serials-management/rulesets/${id}/replaceAndDelete`;

export const MODEL_RULESETS_ENDPOINT = 'serials-management/modelRulesets';

export const GENERATE_PIECES_PREVIEW = 'serials-management/predictedPieces/generate';
export const CREATE_PREDICTED_PIECES = 'serials-management/predictedPieces/create';

export const ORDERS_ENDPOINT = 'orders/composite-orders';
export const RECEIVING_PIECES_ENDPOINT = 'orders/pieces';
export const VENDOR_ENDPOINT = 'organizations/organizations';
export const MATERIAL_TYPE_ENDPOINT = 'material-types';
export const IDENTIFIER_TYPES_ENDPOINT = 'identifier-types';
export const ACQUISITIONS_UNITS_API = 'acquisitions-units/units';
export const TITLES_ENDPOINT = 'orders/titles';
export const HOLDINGS_ENDPOINT = 'holdings-storage/holdings';
export const LOCATIONS_ENDPOINT = 'locations';
