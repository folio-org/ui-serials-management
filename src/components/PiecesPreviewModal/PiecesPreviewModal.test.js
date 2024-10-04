import { useState } from 'react';
import { useMutation } from 'react-query';
import {
  renderWithIntl,
  Button,
  Datepicker,
  TextField,
} from '@folio/stripes-erm-testing';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import PiecesPreviewModal from './PiecesPreviewModal';

import { translationsProperties } from '../../../test/helpers';
import { pieceSet, ruleset } from '../../../test/resources';

/* EXAMPLE Mocking useMutation to allow us to test the .then clause */
const mockMutateAsync = jest.fn(() => Promise.resolve(true));

// Modal is being rendered from the serial view
// After to being saved,hence existing piecesets and allowCreation
const SerialViewRender = () => {
  // We need actual state in here for close test
  const [showModal, setShowModal] = useState(true);

  return (
    <PiecesPreviewModal
      allowCreation
      pieceSets={[pieceSet]}
      ruleset={ruleset}
      setShowModal={setShowModal}
      showModal={showModal}
    />
  );
};

// Modal is being rendered from the ruleset form
// Prior to being saved,hence no piecesets or allowCreation
const RulesetFormComponent = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <PiecesPreviewModal
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

    renderComponent = renderWithIntl(
      <SerialViewRender />,
      translationsProperties
    );
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
    await Button({ id: 'generate-predicted-pieces-button' }).has({
      disabled: true,
    });
  });

  test('renders the preview button', async () => {
    await Button({ id: 'rulset-preview-button' }).has({ disabled: true });
  });

  test('renders the close button', async () => {
    await Button({ id: 'close-button' }).has({ disabled: false });
  });

  describe('PiecesPreviewModal overlapping piece set', () => {
    test('types a date into Datepicker, generate button enabled', async () => {
      await waitFor(async () => {
        await Datepicker({ id: 'ruleset-start-date' }).fillIn('01/01/2026');
        await TextField({ name: 'startingValues[1].levels[0].value' }).fillIn(
          '1'
        );
        await TextField({ name: 'startingValues[1].levels[1].value' }).fillIn(
          '1'
        );
      });
      await Datepicker({ id: 'ruleset-start-date' }).has({
        inputValue: '01/01/2026',
      });

      await Button({ id: 'generate-predicted-pieces-button' }).has({
        disabled: false,
      });
      await waitFor(async () => {
        await Button({ id: 'generate-predicted-pieces-button' }).click();
      });
      await waitFor(async () => {
        expect(mockMutateAsync).toHaveBeenCalled();
      });
    });

    test('types a predicted piece date into Datepicker, see warning, generate button enabled, click it and see confirmation modal', async () => {
      const { getByText, queryByText } = renderComponent;
      await waitFor(async () => {
        await Datepicker({ id: 'ruleset-start-date' }).fillIn('03/19/2024');
        await TextField({ name: 'startingValues[1].levels[0].value' }).fillIn(
          '1'
        );
        await TextField({ name: 'startingValues[1].levels[1].value' }).fillIn(
          '1'
        );
      });
      await Datepicker({ id: 'ruleset-start-date' }).has({
        inputValue: '03/19/2024',
      });

      await waitFor(async () => expect(
        getByText(/Warning: A predicted piece set with the start date/i)
      ).toBeInTheDocument());
      await Button({ id: 'generate-predicted-pieces-button' }).has({
        disabled: false,
      });
      await waitFor(async () => {
        await Button({ id: 'generate-predicted-pieces-button' }).click();
      });
      expect(
        getByText('Confirm generation of overlapping piece sets')
      ).toBeInTheDocument();

      await Button('Cancel generation').has({ disabled: false });
      await Button({ id: 'clickable-generate-confirmation-modal-confirm' }).has(
        { disabled: false }
      );

      await waitFor(async () => {
        await Button('Cancel generation').click();
      });
      await waitFor(async () => {
        expect(
          queryByText('Confirm generation of overlapping piece sets')
        ).not.toBeInTheDocument();
      });
    });
  });
});

describe('PiecesPreviewModal w/o allowCreation', () => {
  beforeEach(() => {
    useMutation.mockReturnValue({ mutateAsync: mockMutateAsync });

    renderComponent = renderWithIntl(
      <RulesetFormComponent />,
      translationsProperties
    );
  });

  test('renders the expected modal header', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Preview predicted pieces')).toBeInTheDocument();
  });

  test('renders the preview button', async () => {
    await Button({ id: 'rulset-preview-button' }).has({ disabled: true });
  });

  test('types a date into Datepicker and starting value fields, preview button enabled, click it', async () => {
    await waitFor(async () => {
      await Datepicker({ id: 'ruleset-start-date' }).fillIn('01/01/2025');
      await TextField({ name: 'startingValues[1].levels[0].value' }).fillIn(
        '1'
      );
      await TextField({ name: 'startingValues[1].levels[1].value' }).fillIn(
        '1'
      );
    });
    await Datepicker({ id: 'ruleset-start-date' }).has({
      inputValue: '01/01/2025',
    });

    await Button({ id: 'rulset-preview-button' }).has({ disabled: false });
    await waitFor(async () => {
      await Button({ id: 'rulset-preview-button' }).click();
    });

    await waitFor(async () => {
      expect(mockMutateAsync).toHaveBeenCalled();
    });
  });
});
