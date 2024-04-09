import { MemoryRouter } from 'react-router-dom';

import { Accordion, renderWithIntl } from '@folio/stripes-erm-testing';

import SerialNotes from './SerialNotes';

import { translationsProperties } from '../../../../test/helpers';
import { serial } from '../../../../test/resources';

describe('DeprecatedPublicationPatterns', () => {
  beforeEach(() => {
    renderWithIntl(
      <MemoryRouter>
        <SerialNotes serial={serial} />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the Serial notes heading', async () => {
    await Accordion('Notes').exists();
  });
});
