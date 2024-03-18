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

    describe('select a pick list', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Select().choose('ChecklistItem.Outcome');
        });
      });

      it('renders expected status of ChecklistItem.Outcome', async () => {
        await Select().has({ value: 'ChecklistItem.Outcome' });
      });
    });

    describe('ChecklistItem.Status', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Select().choose('ChecklistItem.Status');
        });
      });

      it('renders expected ChecklistItem.Status', async () => {
        await Select().has({ value: 'ChecklistItem.Status' });
      });
    });

    describe('PublicationRequest.PublicationType', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Select().choose('PublicationRequest.PublicationType');
        });
      });

      it('renders expected PublicationRequest.PublicationType', async () => {
        await Select().has({ value: 'PublicationRequest.PublicationType' });
      });
    });

    describe('RequestParty.Role', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Select().choose('RequestParty.Role');
        });
      });

      it('renders expected RequestParty.Role', async () => {
        await Select().has({ value: 'RequestParty.Role' });
      });
    });

    describe('PublicationRequest.ClosureReason', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Select().choose('PublicationRequest.ClosureReason');
        });
      });

      it('renders expected PublicationRequest.ClosureReason', async () => {
        await Select().has({ value: 'PublicationRequest.ClosureReason' });
      });
    });

    describe('Funding.AspectFunded', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Select().choose('Funding.AspectFunded');
        });
      });

      it('renders expected Funding.AspectFunded', async () => {
        await Select().has({ value: 'Funding.AspectFunded' });
      });
    });

    describe('Funding.Funder', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Select().choose('Funding.Funder');
        });
      });

      it('renders expected Funding.Funder', async () => {
        await Select().has({ value: 'Funding.Funder' });
      });
    });

    describe('Correspondence.Category', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Select().choose('Correspondence.Category');
        });
      });

      it('renders expected Correspondence.Category', async () => {
        await Select().has({ value: 'Correspondence.Category' });
      });
    });

    describe('Charge.DiscountType', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Select().choose('Charge.DiscountType');
        });
      });

      it('renders expected Charge.DiscountType', async () => {
        await Select().has({ value: 'Charge.DiscountType' });
      });
    });

    describe('Charge.ChargeStatus', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Select().choose('Charge.ChargeStatus');
        });
      });

      it('renders expected Charge.ChargeStatus', async () => {
        await Select().has({ value: 'Charge.ChargeStatus' });
      });
    });

    describe('Charge.Category', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Select().choose('Charge.Category');
        });
      });

      it('renders expected Charge.Category', async () => {
        await Select().has({ value: 'Charge.Category' });
      });
    });

    describe('Party.InstitutionLevel1', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Select().choose('Party.InstitutionLevel1');
        });
      });

      it('renders expected Party.InstitutionLevel1', async () => {
        await Select().has({ value: 'Party.InstitutionLevel1' });
      });
    });
  });
});
