import { renderWithIntl } from '@folio/stripes-erm-testing';

import PiecePublicationDate from './PiecePublicationDate';

import { translationsProperties } from '../../../test/helpers';

const piece = {
  id: '24c7b663-75f8-4b71-a3f8-ff4e0754d750',
  date: '2024-04-01',
  templateString:
    'Vol. {{enumeration1.level1}} Issue {{enumeration1.level2}}, {{chronology1.month}} {{chronology1.year}}',
  label: 'Vol. 1 Issue 1, April 24',
  recurrenceRule: {
    id: '7c524e2b-04ba-479b-adcf-e77dc152ccf3',
    ordinal: 1,
    patternType: {
      id: '2c9180a58e3fc817018e3fd0b92c005a',
      value: 'month_date',
      label: 'Month Date',
    },
    pattern: {
      id: 'c4e268c8-bc21-4dab-819a-10908d82a090',
      day: 1,
    },
  },
  rowIndex: 0,
};

describe('PiecePublicationDate', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <PiecePublicationDate id="piece-set-section-info" piece={piece} />,
      translationsProperties
    );
  });

  test('renders the expected date value', async () => {
    const { getByText } = renderComponent;
    expect(getByText('4/1/2024')).toBeInTheDocument();
  });
});
