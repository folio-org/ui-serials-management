import { translationsProperties as coreTranslations } from '@folio/stripes-erm-testing';

// Direct import is a bit gross, but so is exposing the translations file...
// no super great way to do this so this will do for now.
import ermTranslations from '@folio/stripes-erm-components/translations/stripes-erm-components/en';

import translations from '../../translations/ui-serials-management/en';

const translationsProperties = [
  {
    prefix: 'ui-serials-management',
    translations,
  },
  {
    prefix: 'stripes-erm-components',
    translations: ermTranslations
  },
  ...coreTranslations
];

export default translationsProperties;
