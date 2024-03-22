const refdata = [
  {
    id: '2c9180b382668a1a0182668e6b110000',
    desc: 'ChecklistItem.Outcome',
    internal: false,
    values: [
      {
        id: '2c9180b382668a1a0182668e6b850003',
        value: 'yes',
        label: 'Yes',
      },
      {
        id: '2c9180b382668a1a0182668e6b900004',
        value: 'no',
        label: 'No',
      },
      {
        id: '2c9180b382668a1a0182668e6b960005',
        value: 'other',
        label: 'Other',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6bce0006',
    desc: 'ChecklistItem.Status',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6bda0008',
        value: 'hidden',
        label: 'Hidden',
      },
      {
        id: '2c9180b382668a1a0182668e6bd20007',
        value: 'visible',
        label: 'Visible',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6be10009',
    desc: 'PublicationRequest.Publisher',
    internal: false,
    values: [
      {
        id: '2c9180b382668a1a0182668e6be4000a',
        value: 'publisher_1',
        label: 'Publisher 1',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6bec000b',
    desc: 'PublicationRequest.PublicationType',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6bf6000d',
        value: 'book',
        label: 'Book',
      },
      {
        id: '2c9180b382668a1a0182668e6bef000c',
        value: 'journal_article',
        label: 'Journal Article',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6bfd000e',
    desc: 'PublicationRequest.License',
    internal: false,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c01000f',
        value: 'license_1',
        label: 'License 1',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6c070010',
    desc: 'PublicationRequest.Subtype',
    internal: false,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c0b0011',
        value: 'subtype_1',
        label: 'Subtype 1',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6c100012',
    desc: 'PublicationRequest.RequestStatus',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c1b0014',
        value: 'closed',
        label: 'Closed',
      },
      {
        id: '2c9180b382668a1a0182668e6c220015',
        value: 'in_progress',
        label: 'In progress',
      },
      {
        id: '2c9180b382668a1a0182668e6c130013',
        value: 'new',
        label: 'New',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6c290016',
    desc: 'PublicationRequest.ClosureReason',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c2f0017',
        value: 'rejected',
        label: 'Rejected',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6c350018',
    desc: 'Work.OaStatus',
    internal: false,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c41001a',
        value: 'hybrid',
        label: 'Hybrid',
      },
      {
        id: '2c9180b382668a1a0182668e6c390019',
        value: 'gold',
        label: 'Gold',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6c48001b',
    desc: 'Global.Yes_No',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c4b001c',
        value: 'yes',
        label: 'Yes',
      },
      {
        id: '2c9180b382668a1a0182668e6c53001d',
        value: 'no',
        label: 'No',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6c5a001e',
    desc: 'Payer.Payer',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c690021',
        value: 'author',
        label: 'Author',
      },
      {
        id: '2c9180b382668a1a0182668e6c5d001f',
        value: 'library',
        label: 'Library',
      },
      {
        id: '2c9180b382668a1a0182668e6c630020',
        value: 'dfg',
        label: 'DFG',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6c6e0022',
    desc: 'Funding.AspectFunded',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c770024',
        value: 'publication',
        label: 'Publication',
      },
      {
        id: '2c9180b382668a1a0182668e6c710023',
        value: 'research',
        label: 'Research',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6c7c0025',
    desc: 'Funding.Funder',
    internal: false,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c7f0026',
        value: 'funder_1',
        label: 'Funder 1',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6c860027',
    desc: 'Correspondence.Mode',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c880028',
        value: 'email',
        label: 'Email',
      },
      {
        id: '2c9180b382668a1a0182668e6c8d0029',
        value: 'telephone',
        label: 'Telephone',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6c93002a',
    desc: 'Correspondence.Category',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6c9b002c',
        value: 'funding',
        label: 'Funding',
      },
      {
        id: '2c9180b382668a1a0182668e6c95002b',
        value: 'invoice',
        label: 'Invoice',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6ca0002d',
    desc: 'Correspondence.Status',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6ca8002f',
        value: 'response_needed',
        label: 'Response Needed',
      },
      {
        id: '2c9180b382668a1a0182668e6ca3002e',
        value: 'awaiting_reply',
        label: 'Awaiting Reply',
      },
      {
        id: '2c9180b382668a1a0182668e6cae0030',
        value: 'closed',
        label: 'Closed',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6cb20031',
    desc: 'TitleInstance.SubType',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6cb90033',
        value: 'electronic',
        label: 'Electronic',
      },
      {
        id: '2c9180b382668a1a0182668e6cb40032',
        value: 'print',
        label: 'Print',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6cbd0034',
    desc: 'TitleInstance.Type',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6cc50036',
        value: 'serial',
        label: 'Serial',
      },
      {
        id: '2c9180b382668a1a0182668e6cbf0035',
        value: 'monograph',
        label: 'Monograph',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6cc90037',
    desc: 'TitleInstance.PublicationType',
    internal: false,
    values: [
      {
        id: '2c9180b382668a1a0182668e6ccb0038',
        value: 'book',
        label: 'Book',
      },
      {
        id: '2c9180b382668a1a0182668e6cd00039',
        value: 'journal',
        label: 'Journal',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6cd5003a',
    desc: 'PublicationStatus.PublicationStatus',
    internal: false,
    values: [
      {
        id: '2c9180b382668a1a0182668e6cd7003b',
        value: 'submitted',
        label: 'Submitted',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6cde003c',
    desc: 'PublicationIdentifier.Type',
    internal: false,
    values: [
      {
        id: '2c9180b382668a1a0182668e6ce0003d',
        value: 'pmid',
        label: 'PMID',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6cf2003e',
    desc: 'RequestParty.Role',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6cf90040',
        value: 'request_contact',
        label: 'Request contact',
      },
      {
        id: '2c9180b382668a1a0182668e6cf4003f',
        value: 'corresponding_author',
        label: 'Corresponding author',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6cff0041',
    desc: 'Charge.DiscountType',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6d050043',
        value: 'subtracted',
        label: 'subtracted',
      },
      {
        id: '2c9180b382668a1a0182668e6d010042',
        value: 'percentage',
        label: 'percentage',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6d090044',
    desc: 'Charge.ChargeStatus',
    internal: true,
    values: [
      {
        id: '2c9180b382668a1a0182668e6d0b0045',
        value: 'expected',
        label: 'Expected',
      },
      {
        id: '2c9180b382668a1a0182668e6d100046',
        value: 'invoiced',
        label: 'Invoiced',
      },
    ],
  },
  {
    id: '2c9180b382668a1a0182668e6d150047',
    desc: 'Charge.Category',
    internal: false,
    values: [
      {
        id: '2c9180b382668a1a0182668e6d170048',
        value: 'apc',
        label: 'APC',
      },
      {
        id: '2c9180b382668a1a0182668e6d1d0049',
        value: 'bpc',
        label: 'BPC',
      },
    ],
  },
  {
    id: '2c9180b382a457810182a45bddd70036',
    desc: 'Party.InstitutionLevel1',
    internal: false,
    values: [
      {
        id: 'a2cfe840-5394-487c-80bd-fe74968314cc',
        value: 'faculty_1',
        label: 'Faculty 1',
      },
    ],
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
    ],
  },
  {
    id: '2c9180a48e56f26f018e56fb2c2a0051',
    desc: 'Recurrence.TimeUnits',
    internal: true,
    values: [
      {
        id: '2c9180a48e56f26f018e56fb2c2b0052',
        value: 'day',
        label: 'Day',
      },
      {
        id: '2c9180a48e56f26f018e56fb2c340054',
        value: 'month',
        label: 'Month',
      },
      {
        id: '2c9180a48e56f26f018e56fb2c2f0053',
        value: 'week',
        label: 'Week',
      },
      {
        id: '2c9180a48e56f26f018e56fb2c380055',
        value: 'year',
        label: 'Year',
      },
    ],
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
  {
    'id': '2c9180a48e613e55018e61471c090033',
    'desc': 'Global.MonthDayFormat',
    'internal': true,
    'values': [
      {
        'id': '2c9180a48e613e55018e61471c100035',
        'value': 'number',
        'label': 'Number',
      },
      {
        'id': '2c9180a48e613e55018e61471c0b0034',
        'value': 'ordinal',
        'label': 'Ordinal',
      },
    ],
  },
  {
    'id': '2c9180a48e613e55018e61471bdd002a',
    'desc': 'Global.MonthFormat',
    'internal': true,
    'values': [
      {
        'id': '2c9180a48e613e55018e61471bdf002b',
        'value': 'full',
        'label': 'Full',
      },
      {
        'id': '2c9180a48e613e55018e61471be9002d',
        'value': 'number',
        'label': 'Number',
      },
      {
        'id': '2c9180a48e613e55018e61471be4002c',
        'value': 'slice',
        'label': 'Slice',
      },
    ],
  },
  {
    'id': '2c9180a48e613e55018e61471bee002e',
    'desc': 'Global.WeekdayFormat',
    'internal': true,
    'values': [
      {
        'id': '2c9180a48e613e55018e61471bfe0031',
        'value': 'full_lower',
        'label': 'Full Lower',
      },
      {
        'id': '2c9180a48e613e55018e61471c040032',
        'value': 'full_upper',
        'label': 'Full Upper',
      },
      {
        'id': '2c9180a48e613e55018e61471bf0002f',
        'value': 'slice_lower',
        'label': 'Slice Lower',
      },
      {
        'id': '2c9180a48e613e55018e61471bf60030',
        'value': 'slice_upper',
        'label': 'Slice Upper',
      },
    ],
  },
  {
    'id': '2c9180a48e613e55018e61471bd10027',
    'desc': 'Global.YearFormat',
    'internal': true,
    'values': [
      {
        'id': '2c9180a48e613e55018e61471bd30028',
        'value': 'full',
        'label': 'Full',
      },
      {
        'id': '2c9180a48e613e55018e61471bd80029',
        'value': 'slice',
        'label': 'Slice',
      },
    ],
  },
  {
    'id': '2c9180a48e613e55018e61471abd000d',
    'desc': 'Global.Weekday',
    'internal': true,
    'values': [
      {
        'id': '2c9180a48e613e55018e61471ad80012',
        'value': 'friday',
        'label': 'Friday',
      },
      {
        'id': '2c9180a48e613e55018e61471abf000e',
        'value': 'monday',
        'label': 'Monday',
      },
      {
        'id': '2c9180a48e613e55018e61471add0013',
        'value': 'saturday',
        'label': 'Saturday',
      },
      {
        'id': '2c9180a48e613e55018e61471ae30014',
        'value': 'sunday',
        'label': 'Sunday',
      },
      {
        'id': '2c9180a48e613e55018e61471ad20011',
        'value': 'thursday',
        'label': 'Thursday',
      },
      {
        'id': '2c9180a48e613e55018e61471ac4000f',
        'value': 'tuesday',
        'label': 'Tuesday',
      },
      {
        'id': '2c9180a48e613e55018e61471aca0010',
        'value': 'wednesday',
        'label': 'Wednesday',
      },
    ],
  },
  {
    id: '2c9180a48e613e55018e61471d3e0043',
    desc: 'EnumerationNumericLevelTMRF.Format',
    internal: true,
    values: [
      {
        id: '2c9180a48e613e55018e61471d450045',
        value: 'number',
        label: 'Number',
      },
      {
        id: '2c9180a48e613e55018e61471d400044',
        value: 'ordinal',
        label: 'Ordinal',
      },
      {
        id: '2c9180a48e613e55018e61471d490046',
        value: 'roman',
        label: 'Roman',
      },
    ],
  },
  {
    id: '2c9180a48e613e55018e61471d330040',
    desc: 'EnumerationNumericLevelTMRF.Sequence',
    internal: true,
    values: [
      {
        id: '2c9180a48e613e55018e61471d3a0042',
        value: 'continuous',
        label: 'Continuous',
      },
      {
        id: '2c9180a48e613e55018e61471d340041',
        value: 'reset',
        label: 'Reset',
      },
    ],
  },

  {
    'id': '2c9180a48e613e55018e61471a3b0000',
    'desc': 'Global.Month',
    'internal': true,
    'values': [
      {
        'id': '2c9180a48e613e55018e61471a800004',
        'value': 'april',
        'label': 'April',
      },
      {
        'id': '2c9180a48e613e55018e61471a9e0008',
        'value': 'august',
        'label': 'August',
      },
      {
        'id': '2c9180a48e613e55018e61471ab8000c',
        'value': 'december',
        'label': 'December',
      },
      {
        'id': '2c9180a48e613e55018e61471a6c0002',
        'value': 'february',
        'label': 'February',
      },
      {
        'id': '2c9180a48e613e55018e61471a570001',
        'value': 'january',
        'label': 'January',
      },
      {
        'id': '2c9180a48e613e55018e61471a970007',
        'value': 'july',
        'label': 'July',
      },
      {
        'id': '2c9180a48e613e55018e61471a8f0006',
        'value': 'june',
        'label': 'June',
      },
      {
        'id': '2c9180a48e613e55018e61471a780003',
        'value': 'march',
        'label': 'March',
      },
      {
        'id': '2c9180a48e613e55018e61471a880005',
        'value': 'may',
        'label': 'May',
      },
      {
        'id': '2c9180a48e613e55018e61471ab3000b',
        'value': 'november',
        'label': 'November',
      },
      {
        'id': '2c9180a48e613e55018e61471aad000a',
        'value': 'october',
        'label': 'October',
      },
      {
        'id': '2c9180a48e613e55018e61471aa60009',
        'value': 'september',
        'label': 'September',
      },
    ],
  },
  {
    'id': '2c9180a48e613e55018e61471b480015',
    'desc': 'OmissionRule.TimeUnits',
    'internal': true,
    'values': [
      {
        'id': '2c9180a48e613e55018e61471b4a0016',
        'value': 'day',
        'label': 'Day',
      },
      {
        'id': '2c9180a48e613e55018e61471b650019',
        'value': 'issue',
        'label': 'Issue',
      },
      {
        'id': '2c9180a48e613e55018e61471b600018',
        'value': 'month',
        'label': 'Month',
      },
      {
        'id': '2c9180a48e613e55018e61471b5c0017',
        'value': 'week',
        'label': 'Week',
      },
    ],
  },
];

export default refdata;
