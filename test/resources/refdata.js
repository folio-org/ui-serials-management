const refdata = [
  {
    id: '2c9180b382668a1a0182668e6b110000',
    desc: 'ChecklistItem.Outcome',
    internal: false,
    values: [
      {
        id: '2c9180b382668a1a0182668e6b850003',
        value: 'yes',
        label: 'Yes'
      },
      {
        id: '2c9180b382668a1a0182668e6b900004',
        value: 'no',
        label: 'No'
      },
      {
        id: '2c9180b382668a1a0182668e6b960005',
        value: 'other',
        label: 'Other'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6bce0006',
    desc: 'ChecklistItem.Status',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6bda0008',
        value: 'hidden',
        label: 'Hidden'
      },
      {
        id: '2c9180b382668a1a0182668e6bd20007',
        value: 'visible',
        label: 'Visible'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6be10009',
    desc: 'PublicationRequest.Publisher',
    internal: false,
    values: [
      {
        id: '2c9180b382668a1a0182668e6be4000a',
        value: 'publisher_1',
        label: 'Publisher 1'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6bec000b',
    desc: 'PublicationRequest.PublicationType',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6bf6000d',
        value: 'book',
        label: 'Book'
      },
      {
        id: '2c9180b382668a1a0182668e6bef000c',
        value: 'journal_article',
        label: 'Journal Article'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6bfd000e',
    desc: 'PublicationRequest.License',
    internal: false,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c01000f',
        value: 'license_1',
        label: 'License 1'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6c070010',
    desc: 'PublicationRequest.Subtype',
    internal: false,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c0b0011',
        value: 'subtype_1',
        label: 'Subtype 1'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6c100012',
    desc: 'PublicationRequest.RequestStatus',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c1b0014',
        value: 'closed',
        label: 'Closed'
      },
      {
        id: '2c9180b382668a1a0182668e6c220015',
        value: 'in_progress',
        label: 'In progress'
      },
      {
        id: '2c9180b382668a1a0182668e6c130013',
        value: 'new',
        label: 'New'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6c290016',
    desc: 'PublicationRequest.ClosureReason',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c2f0017',
        value: 'rejected',
        label: 'Rejected'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6c350018',
    desc: 'Work.OaStatus',
    internal: false,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c41001a',
        value: 'hybrid',
        label: 'Hybrid'
      },
      {
        id: '2c9180b382668a1a0182668e6c390019',
        value: 'gold',
        label: 'Gold'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6c48001b',
    desc: 'Global.Yes_No',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c4b001c',
        value: 'yes',
        label: 'Yes'
      },
      {
        id: '2c9180b382668a1a0182668e6c53001d',
        value: 'no',
        label: 'No'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6c5a001e',
    desc: 'Payer.Payer',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c690021',
        value: 'author',
        label: 'Author'
      },
      {
        id: '2c9180b382668a1a0182668e6c5d001f',
        value: 'library',
        label: 'Library'
      },
      {
        id: '2c9180b382668a1a0182668e6c630020',
        value: 'dfg',
        label: 'DFG'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6c6e0022',
    desc: 'Funding.AspectFunded',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c770024',
        value: 'publication',
        label: 'Publication'
      },
      {
        id: '2c9180b382668a1a0182668e6c710023',
        value: 'research',
        label: 'Research'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6c7c0025',
    desc: 'Funding.Funder',
    internal: false,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c7f0026',
        value: 'funder_1',
        label: 'Funder 1'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6c860027',
    desc: 'Correspondence.Mode',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c880028',
        value: 'email',
        label: 'Email'
      },
      {
        id: '2c9180b382668a1a0182668e6c8d0029',
        value: 'telephone',
        label: 'Telephone'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6c93002a',
    desc: 'Correspondence.Category',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c9b002c',
        value: 'funding',
        label: 'Funding'
      },
      {
        id: '2c9180b382668a1a0182668e6c95002b',
        value: 'invoice',
        label: 'Invoice'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6ca0002d',
    desc: 'Correspondence.Status',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6ca8002f',
        value: 'response_needed',
        label: 'Response Needed'
      },
      {
        id: '2c9180b382668a1a0182668e6ca3002e',
        value: 'awaiting_reply',
        label: 'Awaiting Reply'
      },
      {
        id: '2c9180b382668a1a0182668e6cae0030',
        value: 'closed',
        label: 'Closed'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6cb20031',
    desc: 'TitleInstance.SubType',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6cb90033',
        value: 'electronic',
        label: 'Electronic'
      },
      {
        id: '2c9180b382668a1a0182668e6cb40032',
        value: 'print',
        label: 'Print'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6cbd0034',
    desc: 'TitleInstance.Type',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6cc50036',
        value: 'serial',
        label: 'Serial'
      },
      {
        id: '2c9180b382668a1a0182668e6cbf0035',
        value: 'monograph',
        label: 'Monograph'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6cc90037',
    desc: 'TitleInstance.PublicationType',
    internal: false,
    values: [
      {
        id: '2c9180b382668a1a0182668e6ccb0038',
        value: 'book',
        label: 'Book'
      },
      {
        id: '2c9180b382668a1a0182668e6cd00039',
        value: 'journal',
        label: 'Journal'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6cd5003a',
    desc: 'PublicationStatus.PublicationStatus',
    internal: false,
    values: [
      {
        id: '2c9180b382668a1a0182668e6cd7003b',
        value: 'submitted',
        label: 'Submitted'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6cde003c',
    desc: 'PublicationIdentifier.Type',
    internal: false,
    values: [
      {
        id: '2c9180b382668a1a0182668e6ce0003d',
        value: 'pmid',
        label: 'PMID'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6cf2003e',
    desc: 'RequestParty.Role',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6cf90040',
        value: 'request_contact',
        label: 'Request contact'
      },
      {
        id: '2c9180b382668a1a0182668e6cf4003f',
        value: 'corresponding_author',
        label: 'Corresponding author'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6cff0041',
    desc: 'Charge.DiscountType',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6d050043',
        value: 'subtracted',
        label: 'subtracted'
      },
      {
        id: '2c9180b382668a1a0182668e6d010042',
        value: 'percentage',
        label: 'percentage'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6d090044',
    desc: 'Charge.ChargeStatus',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6d0b0045',
        value: 'expected',
        label: 'Expected'
      },
      {
        id: '2c9180b382668a1a0182668e6d100046',
        value: 'invoiced',
        label: 'Invoiced'
      }
    ]
  },
  {
    id: '2c9180b382668a1a0182668e6d150047',
    desc: 'Charge.Category',
    internal: false,
    values: [
      {
        id: '2c9180b382668a1a0182668e6d170048',
        value: 'apc',
        label: 'APC'
      },
      {
        id: '2c9180b382668a1a0182668e6d1d0049',
        value: 'bpc',
        label: 'BPC'
      }
    ]
  },
  {
    id: '2c9180b382a457810182a45bddd70036',
    desc: 'Party.InstitutionLevel1',
    internal: false,
    values: [
      {
        id: 'a2cfe840-5394-487c-80bd-fe74968314cc',
        value: 'faculty_1',
        label: 'Faculty 1'
      },
    ]
  },
    {
    'id': '2c9180a58e4ca4c6018e4cad64e0005e',
    'desc': 'ChronologyTemplateMetadataRule.TemplateMetadataRuleFormat',
    'internal': true,
    'values': [
      {
        'id': '2c9180a58e4ca4c6018e4cad64e1005f',
        'value': 'chronology_date',
        'label': 'Chronology Date',
      },
      {
        'id': '2c9180a58e4ca4c6018e4cad64e60060',
        'value': 'chronology_month',
        'label': 'Chronology Month',
      },
      {
        'id': '2c9180a58e4ca4c6018e4cad64e90061',
        'value': 'chronology_year',
        'label': 'Chronology Year',
      },
    ],
  },
  {
    'id': '2c9180a58e4ca4c6018e4cad63d20042',
    'desc': 'CombinationRule.PatternType',
    'internal': true,
    'values': [
      {
        'id': '2c9180a58e4ca4c6018e4cad63d30043',
        'value': 'issue',
        'label': 'Issue',
      },
      {
        'id': '2c9180a58e4ca4c6018e4cad63e30046',
        'value': 'issue_month',
        'label': 'Issue Month',
      },
      {
        'id': '2c9180a58e4ca4c6018e4cad63d70044',
        'value': 'issue_week',
        'label': 'Issue Week',
      },
      {
        'id': '2c9180a58e4ca4c6018e4cad63dd0045',
        'value': 'issue_week_month',
        'label': 'Issue Week Month',
      },
    ],
  },
  {
    'id': '2c9180a58e4ca4c6018e4cad63cd0040',
    'desc': 'CombinationRule.TimeUnits',
    'internal': true,
    'values': [
      {
        'id': '2c9180a58e4ca4c6018e4cad63ce0041',
        'value': 'issue',
        'label': 'Issue',
      },
    ],
  },
  {
    'id': '2c9180a58e4ca4c6018e4cad63c2003d',
    'desc': 'TemplateMetadataRule.TemplateMetadataRuleType',
    'internal': true,
    'values': [
      {
        'id': '2c9180a58e4ca4c6018e4cad63c4003e',
        'value': 'chronology',
        'label': 'Chronology',
      },
      {
        'id': '2c9180a58e4ca4c6018e4cad63c8003f',
        'value': 'enumeration',
        'label': 'Enumeration',
      },
    ],
  },
];

export default refdata;
