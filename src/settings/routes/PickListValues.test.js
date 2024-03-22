import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { renderWithIntl, Select, Pane } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import PickListValues from './PickListValues';

import { translationsProperties } from '../../../test/helpers';
import mockRefdata from '../../../test/resources/refdata';

jest.mock('@k-int/stripes-kint-components', () => ({
  ...jest.requireActual('@k-int/stripes-kint-components'),
  EditableRefdataList: () => <div>EditableRefdataList</div>,
}));

jest.mock('../../components/utils', () => ({
  ...jest.requireActual('../../components/utils'),
  useSerialsManagementRefdata: () => mockRefdata,
}));

describe('PickListValues', () => {
  describe('rendering the PickListValues', () => {
    beforeEach(() => {
      renderWithIntl(
        <MemoryRouter>
          <PickListValues />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders expected Refdata selection selector', async () => {
      await Select('Pick list').exists();
    });

    test('displays the Pick list values pane', async () => {
      await Pane('Pick list values').is({ visible: true });
    });

    test('renders expected Refdata selection selector', async () => {
      await Select('Pick list').exists();
    });

    test('renders the pick list with correct options', async () => {
      await Select('Pick list').exists();
      await waitFor(async () => {
        await Select('Pick list').choose('OmissionRule.TimeUnits');
        await Select('Pick list').choose('EnumerationNumericLevelTMRF.Format');
        await Select('Pick list').choose('EnumerationNumericLevelTMRF.Sequence');
        await Select('Pick list').choose('Global.YearFormat');
        await Select('Pick list').choose('Global.WeekdayFormat');
        await Select('Pick list').choose('Recurrence.TimeUnits');
        await Select('Pick list').choose('Party.InstitutionLevel1');
        await Select('Pick list').choose('Charge.Category');
        await Select('Pick list').choose('Charge.ChargeStatus');
      });
    });
  });
});
