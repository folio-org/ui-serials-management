import { MemoryRouter } from 'react-router-dom';

import { Accordion, renderWithIntl } from '@folio/stripes-erm-testing';

import SerialPieceSets from './SerialPieceSets';

import { translationsProperties } from '../../../../test/helpers';
import { pieceSet } from '../../../../test/resources';

let renderComponent;
describe('SerialPieceSets', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <SerialPieceSets pieceSet={pieceSet} />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the Predicted piece sets Accordion heading', async () => {
    await Accordion('Predicted piece sets').exists();
  });

  test('renders headline', async () => {
    const { getByText } = renderComponent;
    expect(getByText('The list contains no items')).toBeInTheDocument();
  });
});
