import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import {
  renderWithIntl,
  TestForm,
  Button,
  Selection,
  Select,
} from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../../../test/helpers';
import {
  refdata as mockRefdata,
  locales as mockLocales,
} from '../../../../test/resources';

import ChronologyFieldArray from './ChronologyFieldArray';

jest.mock('./ChronologyField', () => () => <div>ChronologyField</div>);

const onSubmit = jest.fn();

jest.mock('../../../hooks', () => ({
  ...jest.requireActual('../../../hooks'),
  useLocales: () => {
    return { data: mockLocales };
  },
}));

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  useSerialsManagementRefdata: () => {
    return mockRefdata.filter((mr) => {
      return (
        mr.desc === 'ChronologyTemplateMetadataRule.TemplateMetadataRuleFormat'
      );
    });
  },
}));

let renderComponent;
describe('EnumerationFieldArray', () => {
  describe('with no values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <ChronologyFieldArray />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the expected empty chronology rules label', async () => {
      const { getByText } = renderComponent;
      expect(
        getByText('No chronology labels for this publication pattern')
      ).toBeInTheDocument();
    });

    test('renders the add chronology rule button', async () => {
      await Button('Add chronology label').exists();
    });

    describe('clicking the add chronology rule button', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Add chronology label').click();
        });
      });

      test('renders an chronology index card', async () => {
        const { getByText } = renderComponent;
        await waitFor(() => {
          expect(getByText('Chronology label 1')).toBeInTheDocument();
        });
      });

      test('renders the chronology format select field', async () => {
        await Select('Chronology format*').exists();
      });

      test('renders the locale select field', async () => {
        await Selection('Locale*').exists();
      });

      describe('selecting a chronology format value', () => {
        beforeEach(async () => {
          await waitFor(async () => {
            await Select('Chronology format*').choose('Date');
          });
        });

        test('renders a chronology field', () => {
          const { queryByText } = renderComponent;
          expect(queryByText('ChronologyField')).toBeInTheDocument();
        });
      });

      // TODO Broken test
      // describe('deleting the chronology label', () => {
      //   beforeEach(async () => {
      //     await waitFor(async () => {
      //       await Button({ id: 'chronology-0-delete-button' }).click();
      //     });
      //   });

      //   test('no longer renders an chronology index card', () => {
      //     const { queryByText } = renderComponent;
      //     screen.debug();
      //     expect(queryByText('Chronology label 1')).not.toBeInTheDocument();
      //   });
      // });
    });
  });
});
