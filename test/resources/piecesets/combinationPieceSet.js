import { issue } from '../rulesetResources/combinationRules';
import { combinationRuleset } from '../rulesets';
import { findRefdataValue } from '../utils';

const combinationPieceSet = {
  id: 'bd3d2c41-fe33-4ff2-9f0b-fd3959fdabb1',
  ruleset: combinationRuleset,
  pieces: [
    {
      id: 'ed01698e-6cf3-49fe-9bdc-fa305b62cdf3',
      recurrencePieces: [
        {
          id: 'd358c48c-40c1-4d1d-b087-21462629240b',
          date: '2025-01-01',
          recurrenceRule: combinationRuleset.recurrence.rules[0],
          class: 'org.olf.internalPiece.InternalRecurrencePiece',
        },
        {
          id: '66524741-c752-47d6-ac6e-fd84d2312d52',
          date: '2025-02-01',
          recurrenceRule: combinationRuleset.recurrence.rules[0],
          class: 'org.olf.internalPiece.InternalRecurrencePiece',
        },
      ],
      combinationOrigins: [issue],
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Wednesday 1 January 2025',
      class: 'org.olf.internalPiece.InternalCombinationPiece',
    },
    {
      id: '219f4448-5e42-4ce5-992a-e2d9e933331b',
      date: '2025-07-01',
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Tuesday 1 July 2025',
      recurrenceRule: combinationRuleset.recurrence.rules[0],
      class: 'org.olf.internalPiece.InternalRecurrencePiece',
    },
    {
      id: '9c4dbe4f-9a7f-4b65-bf98-81d43c1d0841',
      date: '2025-12-01',
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Monday 1 December 2025',
      recurrenceRule: combinationRuleset.recurrence.rules[0],
      class: 'org.olf.internalPiece.InternalRecurrencePiece',
    },
    {
      id: 'e6e37e1d-cba1-493d-adb8-ae83e2291b3d',
      date: '2025-05-01',
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Thursday 1 May 2025',
      recurrenceRule: combinationRuleset.recurrence.rules[0],
      class: 'org.olf.internalPiece.InternalRecurrencePiece',
    },
    {
      id: '9fda72ae-c68e-4dca-8489-fd501e75ae4c',
      date: '2025-09-01',
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Monday 1 September 2025',
      recurrenceRule: combinationRuleset.recurrence.rules[0],
      class: 'org.olf.internalPiece.InternalRecurrencePiece',
    },
    {
      id: '1b6245ae-9377-436e-9140-5040b12d0380',
      date: '2025-08-01',
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Friday 1 August 2025',
      recurrenceRule: combinationRuleset.recurrence.rules[0],
      class: 'org.olf.internalPiece.InternalRecurrencePiece',
    },
    {
      id: 'ff506b9b-daeb-4c1b-877c-d42629b617ce',
      date: '2025-03-01',
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Saturday 1 March 2025',
      recurrenceRule: combinationRuleset.recurrence.rules[0],
      class: 'org.olf.internalPiece.InternalRecurrencePiece',
    },
    {
      id: 'e2319009-7ee0-424d-8c0a-6f878bab72d7',
      date: '2025-04-01',
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Tuesday 1 April 2025',
      recurrenceRule: combinationRuleset.recurrence.rules[0],
      class: 'org.olf.internalPiece.InternalRecurrencePiece',
    },
    {
      id: '0e088c22-c06a-4f13-b9b9-3bf8d2181b34',
      date: '2025-11-01',
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Saturday 1 November 2025',
      recurrenceRule: combinationRuleset.recurrence.rules[0],
      class: 'org.olf.internalPiece.InternalRecurrencePiece',
    },
    {
      id: '9af601b3-436c-429b-9167-3c28e61c1f13',
      date: '2025-06-01',
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Sunday 1 June 2025',
      recurrenceRule: combinationRuleset.recurrence.rules[0],
      class: 'org.olf.internalPiece.InternalRecurrencePiece',
    },
    {
      id: '52300c1c-d54f-4a8e-a4ae-0f9bd11c8996',
      date: '2025-10-01',
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Wednesday 1 October 2025',
      recurrenceRule: combinationRuleset.recurrence.rules[0],
      class: 'org.olf.internalPiece.InternalRecurrencePiece',
    },
  ],
  dateCreated: '2024-11-05T14:09:11Z',
  lastUpdated: '2024-11-05T14:09:11Z',
  continuationPieceRecurrenceMetadata: {
    id: '81277f95-a24e-47ab-8bd2-19cb0f1bfa86',
    userConfigured: [
      {
        id: 'a7fd96a8-a61d-4d30-a8ce-a8f2e6733b61',
        index: 0,
        userConfiguredTemplateMetadataType: findRefdataValue(
          'UserConfiguredTemplateMetadata.UserConfiguredTemplateMetadataType',
          'chronology'
        ),
        metadataType: {
          id: '85a36cbb-b585-49f2-8913-5651332f6f54',
          monthDay: '1',
          month: 'January',
          weekday: 'Thursday',
          year: '2026',
        },
      },
    ],
  },
  startDate: '2025-01-01',
  note: 'Combination Test',
  title: 'Interesting Times',
};

export default combinationPieceSet;
