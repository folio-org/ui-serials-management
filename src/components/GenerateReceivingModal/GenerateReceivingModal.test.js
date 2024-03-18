import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import {
  renderWithIntl,
  TestForm,
  Button,
  KeyValue,
  Select,
  Checkbox,
} from '@folio/stripes-erm-testing';

import GenerateReceivingModal from './GenerateReceivingModal';

import { translationsProperties } from '../../../test/helpers';
import { pieceSet, serial } from '../../../test/resources';

const onSubmit = jest.fn();
const setShowModal = jest.fn();

let renderComponent;
describe('GenerateReceivingModal', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <TestForm onSubmit={onSubmit}>
          <GenerateReceivingModal
            holdingIds={null}
            pieceSet={pieceSet}
            serial={serial}
            setShowModal={setShowModal}
            showModal
          />
        </TestForm>
        ,
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the modal headline', async () => {
    const { getAllByText } = renderComponent;
    waitFor(() => expect(getAllByText('Generate receiving pieces')).toBeInTheDocument());
  });

  test('renders the expected Total pieces value', async () => {
    await KeyValue('Total pieces').has({ value: '12' });
  });

  test('renders the expected Piece set generated value', async () => {
    await KeyValue('Piece set generated').has({ value: '2024-02-26T10:02:37Z' });
  });

  test('renders the expected start date value', async () => {
    await KeyValue('Start date').has({ value: '2024-02-01' });
  });

  test('renders the expected Pattern ID value', async () => {
    await KeyValue('Pattern ID').has({ value: 'No value set-' });
  });

  test('renders the expected First piece value', async () => {
    await KeyValue('First piece').has({ value: '2024-10-01, 5 9' });
  });

  test('renders the expected Last piecevalue', async () => {
    await KeyValue('Last piece').has({ value: '2024-05-01, 2 4' });
  });

  test('renders the expected Pattern ID value', async () => {
    await KeyValue('Pattern ID').has({ value: 'No value set-' });
  });

  test('renders the expected Pattern ID value', async () => {
    await KeyValue('Pattern ID').has({ value: 'No value set-' });
  });

  test('renders the expected label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Time between publication and receipt (days)')).toBeInTheDocument();
  });

  test('renders the expected label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Piece format')).toBeInTheDocument();
  });

  it('renders expected Piece format with selected option', async () => {
    Select('Piece format').choose('Physical');
  });

  test('clicking the Supplement checkbox', async () => {
    await Checkbox('Supplement').is({ checked: false });
  });

  test('renders the expected Location label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Location')).toBeInTheDocument();
  });

  test('renders the Generate receiving pieces button', async () => {
    await Button('Generate receiving pieces').has({ disabled: true });
  });

  test('Close button should be enabeled', async () => {
    await Button('Close').has({ disabled: false });
  });
});
