import { useState } from 'react';
import { useMutation } from 'react-query';
import {
  renderWithIntl,
  Datepicker,
  Button,
  TextField,
} from '@folio/stripes-erm-testing';

import { waitFor, screen } from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import PiecesPreviewModal from './PiecesPreviewModal';

import { translationsProperties } from '../../../test/helpers';
import { pieceSets, ruleset } from '../../../test/resources';

/* EXAMPLE Mocking useMutation to allow us to test the .then clause */
const mockMutateAsync = jest.fn(() => Promise.resolve(true));

const TestComponent = () => {
  // We need actual state in here for close test
  const [showModal, setShowModal] = useState(true);

  return (
    <PiecesPreviewModal
      allowCreation
      pieceSets={pieceSets}
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

  describe('PiecesPreviewModal Interactions', () => {
    test('types into Datepicker and clicks generate button to trigger ConfirmationModal', async () => {
      const { getByText } = renderComponent;

      // Find the Datepicker input field and type into it
      // Datepicker({ id: 'ruleset-start-date' }).fillIn(pieceSets[0].pieces[0].date);
      // Datepicker({ id: 'ruleset-start-date' }).fillIn('2023-01-01');
      await waitFor(async () => {
        // Datepicker({ id: 'ruleset-start-date' }).focus();
        await Datepicker('Start date*').focus();
        // await Datepicker('Start date*').fillIn('10/05/2024');
        await Datepicker('Start date*').fillIn(pieceSets[0].pieces[0].date);
        // await Datepicker('Start date*').fillIn('01/01/2025');
        await Datepicker('Start date*').blur();
        // Datepicker({ id: 'ruleset-start-date' }).blur();
        // await Datepicker({ id: 'cc-start-date-0' }).has({ inputValue: '01/20/2021' });
      });
      await Datepicker('Start date*').has({ inputValue: '10/05/2024' });
      // await Datepicker('Start date*').has({ inputValue: '01/01/2025' });
      screen.debug();
      await waitFor(async () => expect(getByText(/Warning: A predicted piece set with the start date/i)).toBeInTheDocument());
      await Button({ id: 'generate-predicted-pieces-button' }).has({ disabled: false });
      // await waitFor(() => {
      //   expect(Button({ id: 'generate-predicted-pieces-button' }).has({ disabled: false }));
      // });

      await waitFor(async () => {
        await Button({ id: 'generate-predicted-pieces-button' }).click();
      });
      // Button({ id: 'generate-predicted-pieces-button' }).click();
      // userEvent.click(getByRole('button', { name: 'Generate' }));

      // You might need to wait for the button click action to complete if it triggers async operations
      // await waitFor(() => {
      // Check if the ConfirmationModal is in the document
      // expect(getByText('ConfirmationModal')).toBeInTheDocument();
      expect(getByText('Confirm generation of overlapping piece sets')).toBeInTheDocument();

      // await Button({ id: 'clickable-generate-confirmation-modal-cancel' }).has({ disabled: false });
      await Button('Cancel generation').has({ disabled: false });

      screen.debug();
      // Following not working atm
      // await waitFor(async () => {
      //   // await Button({ id: 'clickable-generate-confirmation-modal-cancel' }).click();
      //   await Button('Cancel generation').click();
      // });
      // expect(getByText('Confirm generation of overlapping piece sets')).not.toBeInTheDocument();
    });
  });
});
