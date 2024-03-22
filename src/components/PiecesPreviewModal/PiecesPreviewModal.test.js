import { useState } from 'react';
import { useMutation } from 'react-query';

import {
  renderWithIntl,
  Datepicker,
  Button,
  TextField,
} from '@folio/stripes-erm-testing';

import PiecesPreviewModal from './PiecesPreviewModal';

import { translationsProperties } from '../../../test/helpers';
import { ruleset } from '../../../test/resources';

/* EXAMPLE Mocking useMutation to allow us to test the .then clause */
const mockMutateAsync = jest.fn(() => Promise.resolve(true));

jest.mock('react-query', () => {
  const { mockReactQuery } = jest.requireActual('@folio/stripes-erm-testing');

  return {
    ...jest.requireActual('react-query'),
    ...mockReactQuery,
    useMutation: jest.fn(),
  };
});

const TestComponent = () => {
  // We need actual state in here for close test
  const [showModal, setShowModal] = useState(true);

  return (
    <PiecesPreviewModal
      allowCreation
      ruleset={ruleset}
      setShowModal={setShowModal}
      showModal={showModal}
    />
  );
};

let renderComponent;
describe('PiecesPreviewModal', () => {
  beforeEach(() => {
    useMutation.mockReturnValue({ mutateAsync: mockMutateAsync });

    renderComponent = renderWithIntl(<TestComponent />, translationsProperties);
  });

  test('useMutation has been called', () => {
    expect(useMutation).toHaveBeenCalled();
  });

  test('renders the expected modal header', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Generate predicted pieces')).toBeInTheDocument();
  });

  test('renders the expected tesxtfield start date label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Start date')).toBeInTheDocument();
  });

  test('renders start date Datepicker', async () => {
    await Datepicker({ id: 'ruleset-start-date' }).exists();
  });

  test('renders the expected tesxtfield note label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Note')).toBeInTheDocument();
  });

  test('renders the expected label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Values to use for the first issue')).toBeInTheDocument();
  });

  test('renders the expected label 1 label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Label 2')).toBeInTheDocument();
  });

  test('renders the expected level 1 label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Level 1')).toBeInTheDocument();
  });

  test('renders the expected level 2 label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Level 2')).toBeInTheDocument();
  });

  test('renders the Lable TextField', async () => {
    await TextField({ id: 'level-index-label' }).exists();
  });

  test('renders the Generate predicted pieces button', async () => {
    await Button({ id: 'generate-predicted-pieces-button' }).has({ disabled: true });
  });

  test('renders the preview button', async () => {
    await Button({ id: 'rulset-preview-button' }).has({ disabled: true });
  });

  test('renders the close button', async () => {
    await Button({ id: 'close-button' }).has({ disabled: false });
  });
});
