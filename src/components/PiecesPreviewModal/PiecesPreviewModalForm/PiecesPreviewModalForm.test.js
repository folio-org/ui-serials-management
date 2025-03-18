import { useState } from 'react';
import { useMutation } from 'react-query';
import {
  renderWithIntl,
  Button,
  Datepicker,
  MessageBanner,
  TextField,
  TestForm,
  Select,
  TextArea,
} from '@folio/stripes-erm-testing';

import {
  screen,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';

import PiecesPreviewModal from '../PiecesPreviewModal';

import { translationsProperties } from '../../../../test/helpers';
import { pieceSet, ruleset, serial } from '../../../../test/resources';
import PiecesPreviewModalForm from './PiecesPreviewModalForm';

let renderComponent;

const onSubmit = jest.fn();

describe('PiecesPreviewModalForm', () => {
  describe('with all props (existingPiecesets, ruleset, serialName, allowCreation)', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <PiecesPreviewModalForm
            allowCreation
            existingPieceSets={[pieceSet]}
            ruleset={ruleset}
            serialName={serial?.orderLine?.title}
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders "Follow on from the last piece in a previous set" select component', async () => {
      await Select('Follow on from the last piece in a previous set').exists();
    });

    test('renders "Start date" date picker component', async () => {
      await Datepicker('Start date*').exists();
    });

    test('renders "Number of years/cycles" text field component', async () => {
      await TextField('Number of years/cycles*').exists();
    });

    test('renders "Note" text area component', async () => {
      await TextArea('Note').exists();
    });

    test('renders "Values to use for the first issue" label', async () => {
      const { getByText } = renderComponent;
      expect(
        getByText('Values to use for the first issue')
      ).toBeInTheDocument();
    });

    test('renders "Label 1" label', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Label 1')).toBeInTheDocument();
    });

    test('renders "Level 1" text field component', async () => {
      await TextField('Level 1*').exists();
    });

    test('renders "Level 2" text field component', async () => {
      await TextField('Level 2*').exists();
    });

    describe('when an existing pieceset is selected from the "Follow on from the last piece in a previous set" select component', () => {
      beforeEach(async () => {
        screen.debug();
        await Select('Follow on from the last piece in a previous set').choose(
          'Publication date: 2/1/2025, Date generated: 2/26/2024 10:02 AM'
        );
      });

      test('datepicker start date renders expected date', async () => {
        await Datepicker('Start date*').has({
          inputValue: '02/01/2025',
        });
      });

      test('text field number of cycles renders expected value', async () => {
        await TextField('Number of years/cycles*').has({ value: '1' });
      });

      test('text field level 1 renders expected value', async () => {
        await TextField('Level 1*').has({ value: '3' });
      });

      test('text field level 2 renders expected value', async () => {
        await TextField('Level 2*').has({ value: '3' });
      });
    });

    describe('when an already covered start date is entered into the date picker component', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Datepicker('Start date*').fillIn('02/01/2024');
          await TextField({
            name: 'startingValues[0].levels[0].rawValue',
          }).fillIn('1');
          await TextField({
            name: 'startingValues[0].levels[1].rawValue',
          }).fillIn('1');
        });
      });

      test('datepicker ruleset start date renders expected date', async () => {
        await Datepicker({ id: 'ruleset-start-date' }).has({
          inputValue: '02/01/2024',
        });
      });

      test('message banner component warning renders as expected', async () => {
        // Annoyingly we cant check to ensure the correct values are being displayed in the banner
        // Whether this is an intl or jest issue I have no idea
        await MessageBanner(
          'Warning: A predicted piece set with the start date <strong>{startDate}</strong> already exists for the serial <strong>{serialName}</strong>'
        ).exists();
      });
    });
  });
});
