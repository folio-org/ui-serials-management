import { useState } from 'react';
import { useMutation } from 'react-query';
import {
  renderWithIntl,
  Datepicker,
  Button,
  TextField,
} from '@folio/stripes-erm-testing';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import PiecesPreviewModal from './PiecesPreviewModal';

import { translationsProperties } from '../../../test/helpers';
import { pieceSets, ruleset } from '../../../test/resources';

/* EXAMPLE Mocking useMutation to allow us to test the .then clause */
const mockMutateAsync = jest.fn(() => Promise.resolve(true));

jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  ConfirmationModal: () => <div>ConfirmationModal</div>,
}));

jest.mock('react-query', () => {
  const { mockReactQuery } = jest.requireActual('@folio/stripes-erm-testing');

  return {
    ...jest.requireActual('react-query'),
    ...mockReactQuery,
    useMutation: jest.fn((_key, func) => ({
      mutateAsync: (...incomingParams) => {
        // Actually call function coming from component
        // This assumes that ky has been mocked, which it should have been by __mocks__ stripes-core.

        // If this function was async, we might need to do something different.
        // As it is, it's a synchronous call to ky which returns a promise we then chain on.
        func();

        // Ensure we return the promise resolve from above, so that any _subsequent_ .then calls can flow
        return mockMutateAsync(...incomingParams);
      }
    })),
  };
});

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

  // test('overlapping start date', async () => {
  //   const { getAllByText, queryByText } = renderComponent;
  //   await waitFor(async () => {
  //     await Datepicker({ id: 'ruleset-start-date' }).fillIn(pieceSets[0].pieces[0].date);
  //   });
  // });
  // test('renders ConfirmationModal Component', async () => {
  //   const { getByText } = renderComponent;
  //   await Datepicker({ id: 'ruleset-start-date' }).fillIn(pieceSets[0].pieces[0].date);
  //   await Button({ id: 'generate-predicted-pieces-button' }).has({ disabled: false }).click();
  //   expect(getByText('ConfirmationModal')).toBeInTheDocument();
  // });

  describe('PiecesPreviewModal Interactions', () => {
    test('types into Datepicker and clicks generate button to trigger ConfirmationModal', async () => {
      const { getByText } = renderComponent;

      // Find the Datepicker input field and type into it
      // Datepicker({ id: 'ruleset-start-date' }).fillIn(pieceSets[0].pieces[0].date);
      Datepicker({ id: 'ruleset-start-date' }).fillIn('2023-01-01');

      // Find and click the 'Generate predicted pieces' button
      Button({ id: 'generate-predicted-pieces-button' }).click();

      // You might need to wait for the button click action to complete if it triggers async operations
      await waitFor(() => {
        // Check if the ConfirmationModal is in the document
        expect(getByText('ConfirmationModal')).toBeInTheDocument();
      });
    });
  });
});
