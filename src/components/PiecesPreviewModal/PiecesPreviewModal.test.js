import { useState } from 'react';
import { useMutation } from 'react-query';
import {
  renderWithIntl,
  Button,
  Datepicker,
  MessageBanner,
  TextField,
} from '@folio/stripes-erm-testing';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import PiecesPreviewModal from './PiecesPreviewModal';

import { translationsProperties } from '../../../test/helpers';
import { pieceSets, ruleset } from '../../../test/resources';

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
      existingPieceSets={pieceSets}
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
// TODO this test is throwing up a big ugly warning about updating a component while updating another component.
// Either the test needs fixing or the component does
// It's also really f***ing slow, not sure what to do about that but this test shouldn't take 11 seconds

// ^^ That is possibly down to the wild form interactions... maybe some of them need refactoring as well.

// Most of these interactions are actually PiecesPreviewModalForm... can we split these tests out and be more economical??
// ie tests that the modal opens as expected, and that submits etc do whatever,
// and then tests for form interactions that don't need to live in a modal
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

  // TODO These test titles are somewhat meaningless... we should ahve better test data and give proper descriptions so devs know what has actually been tested
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
    // Typically interactions belong in a beforeEach for a describe
    describe('typing dates into datepicker', () => {
      beforeEach(async () => {
        mockMutateAsync.mockClear();
        await waitFor(async () => {
          await Datepicker({ id: 'ruleset-start-date' }).fillIn('01/01/2025');
          await TextField({ name: 'startingValues[1].levels[0].value' }).fillIn(
            '1'
          );
          await TextField({ name: 'startingValues[1].levels[1].value' }).fillIn(
            '1'
          );
        });
      });

      test('datepicker ruleset start date renders expected date', async () => {
        await Datepicker({ id: 'ruleset-start-date' }).has({
          inputValue: '01/01/2025',
        });
      });

      test('generate predicted pieces button is not disabled', async () => {
        await Button({ id: 'generate-predicted-pieces-button' }).has({
          disabled: false,
        });
      });

      describe('clicking generate', () => {
        beforeEach(async () => {
          await waitFor(async () => {
            await Button({ id: 'generate-predicted-pieces-button' }).click();
          });
        });

        test('mutateAsync was called', async () => {
          await waitFor(() => {
            expect(mockMutateAsync).toHaveBeenCalled();
          });
        });
      });
    });

    // TODO this title isn't great... needs elaboration
    describe('typing already covered predicted piece dates into datepicker', () => {
      beforeEach(async () => {
        mockMutateAsync.mockClear();
        await waitFor(async () => {
          await Datepicker({ id: 'ruleset-start-date' }).fillIn('03/19/2024');
          await TextField({ name: 'startingValues[1].levels[0].value' }).fillIn(
            '1'
          );
          await TextField({ name: 'startingValues[1].levels[1].value' }).fillIn(
            '1'
          );
        });
      });

      test('datepicker ruleset start date renders expected date', async () => {
        await Datepicker({ id: 'ruleset-start-date' }).has({
          inputValue: '03/19/2024',
        });
      });

      test('warning renders as expected', async () => {
        await waitFor(async () => {
          // TODO not really a TODO but a note to NOT use regex with a wide queryBy in a waitFor like this, it'll end up parsing everything again and again
          // Besides we have these interactors for a reason ;)
          await MessageBanner(/Warning: A predicted piece set with the start date/).exists();
        });
      });

      test('generate predicted pieces button is not disabled', async () => {
        await Button({ id: 'generate-predicted-pieces-button' }).has({
          disabled: false,
        });
      });

      describe('clicking generate', () => {
        beforeEach(async () => {
          await waitFor(async () => {
            await Button({ id: 'generate-predicted-pieces-button' }).click();
          });
        });

        test('warning about overlapping piece sets renders', async () => {
          const { queryByText } = renderComponent;

          await waitFor(() => {
            expect(queryByText('Confirm generation of overlapping piece sets')).toBeInTheDocument();
          });
        });

        test('cancel button renders as expected', async () => {
          await Button('Cancel generation').has({ disabled: false });
        });

        describe('cancelling generate', () => {
          beforeEach(async () => {
            await waitFor(async () => {
              await Button('Cancel generation').click();
            });
          });

          test('warning about overlapping piece sets no longer renders', async () => {
            const { queryByText } = renderComponent;

            await waitFor(() => {
              expect(queryByText('Confirm generation of overlapping piece sets')).not.toBeInTheDocument();
            });
          });
        });
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

  // TODO better name for this
  describe('typing dates into fields', () => {
    beforeEach(async () => {
      await waitFor(async () => {
        await Datepicker({ id: 'ruleset-start-date' }).fillIn('01/01/2025');
        await TextField({ name: 'startingValues[1].levels[0].value' }).fillIn(
          '1'
        );
        await TextField({ name: 'startingValues[1].levels[1].value' }).fillIn(
          '1'
        );
      });
    });

    test('datepicker has expected value', async () => {
      await Datepicker({ id: 'ruleset-start-date' }).has({
        inputValue: '01/01/2025',
      });
    });

    test('preview button is not disabled', async () => {
      await Button({ id: 'rulset-preview-button' }).has({ disabled: false });
    });

    describe('clicking preview button', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button({ id: 'rulset-preview-button' }).click();
        });
      });

      // We should test it's going to the right endpoint, since there's a difference
      // TODO also names should be about user expectations, not code expectations
      test('mutateAsync got called', async () => {
        await waitFor(async () => {
          expect(mockMutateAsync).toHaveBeenCalled();
        });
      });
    });
  });
});
