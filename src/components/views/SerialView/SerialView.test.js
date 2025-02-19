import { renderWithIntl, Button, Modal } from '@folio/stripes-erm-testing';
import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { translationsProperties } from '../../../../test/helpers';
import SerialView from './SerialView';
import { handlers } from '../../../../test/resources';

jest.mock('../../SerialSections/SerialInfo', () => () => <div>SerialInfo</div>);
jest.mock('../../SerialSections/SerialPOLine', () => () => <div>SerialPOLine</div>);
jest.mock('../../SerialSections/PublicationPattern', () => () => (
  <div>PublicationPattern</div>
));
jest.mock('../../SerialSections/DeprecatedPublicationPatterns', () => () => (
  <div>DeprecatedPublicationPatterns</div>
));
jest.mock('../../SerialSections/SerialNotes', () => () => (
  <div>SerialNotes</div>
));
jest.mock('../../SerialSections/SerialPieceSets', () => () => (
  <div>SerialPieceSets</div>
));
jest.mock('../../PiecesPreviewModal/PiecesPreviewModal', () => () => (
  <div>PiecesPreviewModal</div>
));

jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  LoadingPane: () => <div>LoadingPane</div>,
}));


const props = {
  onClose: jest.fn(),
  queryProps: {
    isLoading: false,
  },
  resource: {
    id: '633dc78c-215f-4b37-b241-52bbace4c3c8',
    serialRulesets: [
      {
        id: 'ef4f481a-7fd3-4d13-9812-9d2694935683',
        combination: {
          id: '5267fdba-4abf-4298-b46c-4b3ef719b7ba',
          rules: [
            {
              id: '85a28b69-3ce7-4383-96b1-d144f6307e3c',
              issuesToCombine: 2,
              timeUnit: {
                id: '2c9180a28ebb5fcd018ebb68ab450055',
                value: 'issue',
                label: 'Issue',
              },
              patternType: {
                id: '2c9180a28ebb5fcd018ebb68ab56005a',
                value: 'issue_month',
                label: 'Issue Month',
              },
              pattern: {
                id: 'adf1f1c4-d2b0-4da3-b28c-7960c5ce9597',
                month: '{id: "2c9180a28ebb5fcd018ebb68a7940001", label: "Ja…}',
                issue: 1,
              },
            },
          ],
        },
        dateCreated: '2024-04-08T17:14:17Z',
        recurrence: {
          id: 'fc35ca75-607d-48b9-a22a-a752159afae5',
          rules: ['{id: "29e53693-9701-4da4-8534-96359054feae", ordina…}'],
          timeUnit: {
            id: '2c9180a28ebb5fcd018ebb68a8cc002a',
            value: 'month',
            label: 'Month',
          },
          period: 1,
          issues: 1,
        },
        lastUpdated: '2024-04-08T17:14:17Z',
        rulesetStatus: {
          id: '2c9180a28ebb5fcd018ebb68a8d7002d',
          value: 'active',
          label: 'Active',
        },
        owner: {
          id: '633dc78c-215f-4b37-b241-52bbace4c3c8',
        },
        templateConfig: {
          id: '6267c5ff-0a50-4e3d-a69e-d5d01a0aab9a',
          rules: ['{id: "460be6ba-d09a-41e1-a60a-879db0b1b436", index:…}'],
          templateString: 'test 1',
        },
        description: 'test1',
      },
      {
        id: '4e007de8-98b3-4e20-853c-53fde7ad6639',
        dateCreated: '2024-04-08T11:20:50Z',
        recurrence: {
          id: '4fb7605c-c162-4fa9-8c8b-aa2df15eb4d9',
          rules: ['{id: "f32012b0-24a4-46f3-a66f-62f0f27b6b11", ordina…}'],
          timeUnit: {
            id: '2c9180a28ebb5fcd018ebb68a8c10028',
            value: 'day',
            label: 'Day',
          },
          period: 1,
          issues: 1,
        },
        lastUpdated: '2024-04-08T17:14:16Z',
        rulesetStatus: {
          id: '2c9180a28ebb5fcd018ebb68a8e2002f',
          value: 'deprecated',
          label: 'Deprecated',
        },
        owner: {
          id: '633dc78c-215f-4b37-b241-52bbace4c3c8',
        },
        omission: {
          id: '558a9971-5325-447a-9517-b5bb82a91da6',
          rules: [
            {
              id: '8e50e107-f7b8-481b-bb4d-1edf5cf372fa',
              timeUnit: {
                id: '2c9180a28ebb5fcd018ebb68a8140016',
              },
              patternType: {
                id: '2c9180a28ebb5fcd018ebb68a831001c',
                value: 'day_month',
                label: 'Day Month',
              },
              pattern: {
                id: '66d07f99-e254-45a5-9404-22d49115e712',
                month: {
                  id: '2c9180a28ebb5fcd018ebb68a7940001',
                  value: 'january',
                  label: 'January',
                },
                day: 1,
              },
            },
          ],
        },
        templateConfig: {
          id: '796f22d9-8564-4938-a13e-e55f7c7db018',
          rules: [
            {
              id: 'ca437b52-8b4d-4c10-9e16-8fe7aa3bf7e8',
              index: 0,
              templateMetadataRuleType: {
                id: '2c9180a28ebb5fcd018ebb68ab1a0052',
                value: 'chronology',
                label: 'Chronology',
              },
              ruleType: {
                id: '918426a2-03ea-44f9-b30c-51b9276676f6',
                templateMetadataRuleFormat:
                  '{id: "2c9180a28ebb5fcd018ebb68ab140050", label: "Ch…}',
                ruleFormat: '{id: "c41e4da7-deef-4414-9567-1eb8e0d54685", yearFo…}',
              },
            },
          ],
          templateString: 'test',
        },
        description: 'test',
      },
    ],
    dateCreated: '2024-04-08T11:19:54Z',
    lastUpdated: '2024-04-08T12:30:29Z',
    orderLine: {
      id: '2c9180a28ebb5fcd018ebd6fa6450062',
      remoteId: '9ce8a592-049e-4485-a886-52bc74f1c9cd',
      remoteId_object: {
        id: '9ce8a592-049e-4485-a886-52bc74f1c9cd',
        checkinItems: false,
        acquisitionMethod: '306489dd-0053-49ee-a068-c316444a8f55',
        automaticExport: false,
        alerts: '[]',
        cancellationRestriction: true,
        claims: '[]',
        claimingActive: false,
        claimingInterval: 45,
        collection: false,
        contributors: '[]',
        cost: {
          listUnitPrice: 1,
          currency: 'USD',
          discountType: 'percentage',
          quantityPhysical: 1,
          poLineEstimatedPrice: 1,
        },
        details: {
          isAcknowledged: false,
          productIds: [],
          subscriptionInterval: 0,
        },
        donorOrganizationIds: '[]',
        fundDistribution: '[]',
        isPackage: false,
        locations: [
          {
            locationId: 'fcd64ce1-6995-48f0-840e-89ffa2288371',
            quantity: 1,
            quantityPhysical: 1,
          },
        ],
        orderFormat: 'Physical Resource',
        paymentStatus: 'Pending',
        physical: {
          createInventory: 'Instance, Holding, Item',
          materialType: '1a54b431-2e4f-452d-9cae-9cee66c9a892',
          materialSupplier: 'e0fb5df2-cdf1-11e8-a8d5-f2801f1b9fd1',
          volumes: [],
        },
        poLineNumber: '10016-1',
        purchaseOrderId: '1aff4bb0-90ad-4873-bf6f-22d2afc1ef38',
        receiptStatus: 'Pending',
        reportingCodes: '[]',
        rush: false,
        source: 'User',
        titleOrPackage: 'Sport20',
        vendorDetail: {
          instructions: '',
          vendorAccount: '1234',
          referenceNumbers: [],
        },
        metadata: {
          createdDate: '2024-04-08T11:36:00.251+00:00',
          createdByUserId: '507bff1f-07fd-50c1-ba48-4b3af05e9095',
          updatedDate: '2024-04-08T11:36:00.251+00:00',
          updatedByUserId: '507bff1f-07fd-50c1-ba48-4b3af05e9095',
        },
      },
      title: 'Sport20',
      owner: {
        id: '633dc78c-215f-4b37-b241-52bbace4c3c8',
      },
    },
    notes: '[]',
    description: 'test',
    serialStatus: {
      id: '2c9180a28ebb5fcd018ebb68a8e80031',
      value: 'active',
      label: 'Active',
    },
  },
};

describe('SerialView', () => {
  let renderComponent;
  describe('renders components with no serial', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <SerialView onClose={handlers.onClose} queryProps={{ isLoading: true }} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders LoadingPane Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('LoadingPane')).toBeInTheDocument();
    });
  });
  // describe('renders components with no serial', () => {
  //   beforeEach(() => {
  //     renderComponent = renderWithIntl(
  //       <MemoryRouter>
  //         <SerialView onClose={handlers.onClose} queryProps={{ isLoading: false }} />
  //       </MemoryRouter>,
  //       translationsProperties
  //     );
  //   });

  //   test('renders SerialInfo Component', () => {
  //     const { getByText } = renderComponent;
  //     expect(getByText('SerialInfo')).toBeInTheDocument();
  //   });

  //   test('renders PublicationPattern Component', () => {
  //     const { getByText } = renderComponent;
  //     expect(getByText('PublicationPattern')).toBeInTheDocument();
  //   });

  //   test('renders SerialNotes Component', () => {
  //     const { getByText } = renderComponent;
  //     expect(getByText('SerialNotes')).toBeInTheDocument();
  //   });

  //   test('renders expected serial header', () => {
  //     const { getByText } = renderComponent;
  //     expect(getByText('Serial -')).toBeInTheDocument();
  //   });

  //   test('Action menu has edit button', async () => {
  //     await waitFor(async () => {
  //       await Button('Actions').click();
  //       await Button('Edit').click();
  //     });
  //   });

  //   test('renders the expected header', () => {
  //     const { getByText } = renderComponent;
  //     expect(
  //       getByText('stripes-components.metaSection.screenReaderLabel')
  //     ).toBeInTheDocument();
  //   });

  //   test('renders Record last updated', () => {
  //     const { getByText } = renderComponent;
  //     expect(getByText('Record last updated: Unknown')).toBeInTheDocument();
  //   });

  //   test('renders Record created', () => {
  //     const { getByText } = renderComponent;
  //     expect(getByText('Record created: Unknown')).toBeInTheDocument();
  //   });

  //   test('renders MetaSection Component', () => {
  //     const { getByText } = renderComponent;
  //     expect(getByText('Record created: Unknown')).toBeInTheDocument();
  //     expect(getByText('Record last updated: Unknown')).toBeInTheDocument();
  //   });
  // });

  describe('renders components with serial', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <SerialView {...props} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders Serial title', () => {
      const { getByText } = renderComponent;
      expect(getByText('Title - Sport20')).toBeInTheDocument();
    });

    test('renders Serial PO line', () => {
      const { getByText } = renderComponent;
      expect(getByText('PO line - 10016-1')).toBeInTheDocument();
    });

    test('renders MetaSection Component', () => {
      const { getByText } = renderComponent;
      expect(
        getByText('Record last updated: 4/8/2024 12:30 PM')
      ).toBeInTheDocument();
      expect(getByText('Record created: 4/8/2024 11:19 AM')).toBeInTheDocument();
    });

    test('renders SerialInfo Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('SerialInfo')).toBeInTheDocument();
    });

    test('renders SerialPOLine Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('SerialPOLine')).toBeInTheDocument();
    });

    test('renders PublicationPattern Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('PublicationPattern')).toBeInTheDocument();
    });

    test('renders SerialNotes Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('SerialNotes')).toBeInTheDocument();
    });

    test('renders DeprecatedPublicationPatterns Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('DeprecatedPublicationPatterns')).toBeInTheDocument();
    });

    test('Action menu has edit button', async () => {
      await waitFor(async () => {
        await Button('Actions').click();
        await Button('Edit').click();
      });
    });

    test('Action menu has delete button', async () => {
      await waitFor(async () => {
        await Button('Actions').click();
        await Button('Delete').click();
      });
    });

    describe('opening actions menu', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Actions').click();
        });
      });

      describe('clicking delete', () => {
        beforeEach(async () => {
          await waitFor(async () => {
            await Button('Delete').click();
          });
        });

        test('renders the confirmation modal', async () => {
          await waitFor(async () => {
            await Modal('Delete serial').exists();
          });
        });

        describe('cancelling confirmation modal', () => {
          beforeEach(async () => {
            await waitFor(async () => {
              await Button('Cancel').click(); // close the modal
            });
          });

          test('confirmation modal no longer renders', async () => {
            await waitFor(async () => {
              await Modal('Delete serial').absent();
            });
          });
        });
      });
    });
  });
});
