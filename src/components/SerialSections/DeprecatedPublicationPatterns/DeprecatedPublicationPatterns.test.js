import { MemoryRouter } from 'react-router-dom';

import { Accordion, renderWithIntl } from '@folio/stripes-erm-testing';

import DeprecatedPublicationPatterns from './DeprecatedPublicationPatterns';

import { translationsProperties } from '../../../../test/helpers';
import { pieceSet } from '../../../../test/resources';

describe('DeprecatedPublicationPatterns', () => {
  beforeEach(() => {
    renderWithIntl(
      <MemoryRouter>
        <DeprecatedPublicationPatterns pieceSet={pieceSet} />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the Predicted piece sets Accordion heading', async () => {
    await Accordion('Deprecated publication patterns').exists();
  });
});
