const serial = {
  id: '9be5cebf-c676-4430-9439-4f47973d8a47',
  serialRulesets: [
    {
      id: '87edca46-4cff-45c4-9023-3aa20d09330b',
      dateCreated: '2024-02-26T09:58:59Z',
      recurrence: {
        id: '117033e7-a807-4012-b2f6-12036198c398',
        rules: [
          {
            id: '508b1a9b-1fb9-46b9-9781-638ba9ad07fc',
            ordinal: 1,
            patternType: {
              id: '2c9180a58de0851d018de08d8eea0021',
              value: 'month_date',
              label: 'Month Date',
            },
            pattern: {
              id: 'b5ff4f58-5778-4755-b496-d3786fd833a3',
              day: 1,
            },
          },
        ],
        timeUnit: {
          id: '2c9180a58de0851d018de08d918d005c',
          value: 'month',
          label: 'Month',
        },
        period: 1,
        issues: 1,
      },
      lastUpdated: '2024-02-26T09:58:59Z',
      rulesetStatus: {
        id: '2c9180a58de0851d018de08d8f460027',
        value: 'active',
        label: 'Active',
      },
      owner: {
        id: '9be5cebf-c676-4430-9439-4f47973d8a47',
      },
      templateConfig: {
        id: 'f5217917-0e2c-4e11-9adc-9769841676f2',
        rules: [
          {
            id: 'd30fde65-c7eb-4e01-98b0-fa9ca16167fe',
            index: 0,
            templateMetadataRuleType: {
              id: '2c9180a58de0851d018de08d90b4003f',
              value: 'enumeration',
              label: 'Enumeration',
            },
            ruleType: {
              id: '92f59b68-056a-4f9d-86af-7190fef9b762',
              templateMetadataRuleFormat: {
                id: '2c9180a58de0851d018de08d8ed5001c',
                value: 'enumeration_numeric',
                label: 'Enumeration Numeric',
              },
              ruleFormat: {
                id: '7459d9e9-6049-44be-b773-e6836205bcfc',
                levels: [
                  {
                    id: '30ca0123-a758-4054-8c3b-4d85270738aa',
                    index: 0,
                    units: 2,
                    sequence: {
                      id: '2c9180a58de0851d018de08d909e0038',
                      value: 'continuous',
                      label: 'Continuous',
                    },
                    format: {
                      id: '2c9180a58de0851d018de08d90a7003b',
                      value: 'number',
                      label: 'Number',
                    },
                  },
                  {
                    id: 'fceb4e8b-41bd-4b7f-ae18-3a5c36d17e65',
                    index: 1,
                    units: 2,
                    sequence: {
                      id: '2c9180a58de0851d018de08d909e0038',
                      value: 'continuous',
                      label: 'Continuous',
                    },
                    format: {
                      id: '2c9180a58de0851d018de08d90a7003b',
                      value: 'number',
                      label: 'Number',
                    },
                  },
                ],
              },
            },
          },
        ],
        templateString: '{{enumeration1.level1}} {{enumeration1.level2}}',
      },
    },
    {
      id: '3c79d72a-8e01-426e-a7c0-a5d23f4b8a9c',
      dateCreated: '2024-02-26T10:01:18Z',
      recurrence: {
        id: '4ac651a6-e45b-4865-82f3-1e12b4192d29',
        rules: [
          {
            id: 'ccd71e9c-936a-4991-9b52-1df14551c799',
            ordinal: 1,
            patternType: {
              id: '2c9180a58de0851d018de08d8ee0001f',
              value: 'day',
              label: 'Day',
            },
            pattern: {
              id: '1f665694-d678-4ef5-ab73-65ede7a097d0',
            },
          },
        ],
        timeUnit: {
          id: '2c9180a58de0851d018de08d9186005a',
          value: 'day',
          label: 'Day',
        },
        period: 1,
        issues: 1,
      },
      lastUpdated: '2024-02-26T10:01:18Z',
      rulesetStatus: {
        id: '2c9180a58de0851d018de08d8f500029',
        value: 'deprecated',
        label: 'Deprecated',
      },
      owner: {
        id: '9be5cebf-c676-4430-9439-4f47973d8a47',
      },
      templateConfig: {
        id: '68eba564-b70c-428c-8c3e-c96354d0f5b3',
        rules: [],
        templateString: '123',
      },
      description: '123',
    },
  ],
  dateCreated: '2024-02-26T09:58:02Z',
  lastUpdated: '2024-02-26T09:58:02Z',
  orderLine: {
    id: '2c9180a58de0851d018de4d99aea0062',
    remoteId: 'baec48dd-1594-2712-be8f-de336bc83fcc',
    remoteId_object: {
      id: 'baec48dd-1594-2712-be8f-de336bc83fcc',
      edition: 'First edition',
      checkinItems: false,
      agreementId: '800b2f19-7134-4408-8145-3b04697b7de7',
      acquisitionMethod: 'df26d81b-9d63-4ff8-bf41-49bf75cfa70e',
      automaticExport: false,
      alerts: [],
      cancellationRestriction: false,
      cancellationRestrictionNote: '',
      claims: [
        {
          claimed: true,
          grace: 0,
        },
      ],
      claimingActive: false,
      collection: false,
      contributors: [],
      cost: {
        listUnitPrice: 500,
        listUnitPriceElectronic: 0,
        currency: 'USD',
        additionalCost: 0,
        discount: 20,
        discountType: 'amount',
        quantityPhysical: 6,
        quantityElectronic: 1,
        poLineEstimatedPrice: 2980,
      },
      description: '',
      details: {
        receivingNote: '',
        isAcknowledged: false,
        productIds: [
          {
            productId: '0552142352',
            productIdType: '8261054f-be78-422d-bd51-4ed9f33c3422',
          },
          {
            productId: '9780552142352',
            productIdType: '8261054f-be78-422d-bd51-4ed9f33c3422',
          },
        ],
        subscriptionFrom: '2018-07-20T00:00:00.000+00:00',
        subscriptionInterval: 1095,
        subscriptionTo: '2021-07-19T00:00:00.000+00:00',
      },
      donor: '',
      donorOrganizationIds: [],
      eresource: {
        activated: false,
        activationDue: 1,
        createInventory: 'Instance, Holding',
        trial: true,
        expectedActivation: '2019-07-20T00:00:00.000+00:00',
        userLimit: 0,
        accessProvider: '14fb6608-cdf1-11e8-a8d5-f2801f1b9fd1',
        materialType: 'a7eb0130-7287-4485-b32c-b4b5814da0fa',
      },
      fundDistribution: [
        {
          code: 'USHIST',
          encumbrance: 'e1a607b4-2ed3-4bd9-9c1e-3726737d5425',
          fundId: '65032151-39a5-4cef-8810-5350eb316300',
          distributionType: 'percentage',
          value: 50,
        },
        {
          code: 'EUROHIST',
          encumbrance: '6268d1e5-00c4-4ba7-86ff-c3eeb44886ea',
          fundId: 'e9285a1c-1dfc-4380-868c-e74073003f43',
          distributionType: 'percentage',
          value: 50,
        },
      ],
      isPackage: true,
      locations: [
        {
          locationId: 'f34d27c6-a8eb-461b-acd6-5dea81771e70',
          quantity: 2,
          quantityElectronic: 1,
          quantityPhysical: 1,
        },
        {
          locationId: 'fcd64ce1-6995-48f0-840e-89ffa2288371',
          quantity: 1,
          quantityElectronic: 0,
          quantityPhysical: 1,
        },
        {
          locationId: 'b241764c-1466-4e1d-a028-1a3684a5da87',
          quantity: 4,
          quantityElectronic: 0,
          quantityPhysical: 4,
        },
      ],
      orderFormat: 'P/E Mix',
      paymentStatus: 'Pending',
      physical: {
        createInventory: 'Instance, Holding, Item',
        materialType: '5ee11d91-f7e8-481d-b079-65d708582ccc',
        materialSupplier: '70fb4e66-cdf1-11e8-a8d5-f2801f1b9fd1',
        receiptDue: '2018-08-19T00:00:00.000+00:00',
        volumes: ['vol. 1'],
      },
      poLineDescription: '',
      poLineNumber: '52590-1',
      purchaseOrderId: '0610be6d-0ddd-494b-b867-19f63d8b5d6d',
      receiptStatus: 'Pending',
      reportingCodes: [],
      requester: '',
      rush: false,
      selector: 'sgw',
      source: 'User',
      tags: {
        tagList: ['membership'],
      },
      titleOrPackage: 'Interesting Times',
      vendorDetail: {
        instructions: '',
        noteFromVendor: '',
        vendorAccount: '',
        referenceNumbers: [],
      },
      metadata: {
        createdDate: '2024-02-25T13:55:09.405+00:00',
        updatedDate: '2024-02-25T13:55:09.405+00:00',
      },
    },
    titleId: '7cef39f1-4fb1-49d5-9a6b-a072e632144d',
    title: 'Interesting Times',
    owner: {
      id: '9be5cebf-c676-4430-9439-4f47973d8a47',
    },
  },
  notes: [
    {
      id: '119f5274-95f4-4c75-9688-8a8ce267c333',
      note: 'Test Note',
    },
  ],
  description: 'Test Description',
  serialStatus: {
    id: '2c9180a58de0851d018de08d8e760016',
    value: 'active',
    label: 'Active',
  },
};

export default serial;
