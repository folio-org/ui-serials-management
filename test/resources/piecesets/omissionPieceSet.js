import { omissionRuleset } from '../rulesets';
import { dayMonth as omissionDayMonth } from '../rulesetResources/omissionsRules';
import { findRefdataValue } from '../utils';

const omissionPieceSet = {
  id: 'e06cdeed-acb7-46aa-abaa-d771a4192435',
  ruleset: omissionRuleset,
  pieces: [
    {
      id: '9bcc1e4b-6ec7-440c-b1ab-b587de7c7f68',
      date: '2025-01-01',
      omissionOrigins: [omissionDayMonth],
      class: 'org.olf.internalPiece.InternalOmissionPiece',
    },
    {
      id: '4113344a-8b83-4656-adfc-e6eebd188f33',
      date: '2025-12-01',
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Monday 1 December 2025',
      recurrenceRule: omissionRuleset.recurrence.rules[0],
      class: 'org.olf.internalPiece.InternalRecurrencePiece',
    },
    {
      id: '35276551-40bc-4767-8024-c2732ff1c738',
      date: '2025-11-01',
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Saturday 1 November 2025',
      recurrenceRule: omissionRuleset.recurrence.rules[0],
      class: 'org.olf.internalPiece.InternalRecurrencePiece',
    },
    {
      id: '7ec0998f-66fd-47fe-9dbb-15e3e7277373',
      date: '2025-07-01',
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Tuesday 1 July 2025',
      recurrenceRule: omissionRuleset.recurrence.rules[0],
      class: 'org.olf.internalPiece.InternalRecurrencePiece',
    },
    {
      id: '3b83b892-3f70-44bf-823c-d2405f24eb9c',
      date: '2025-03-01',
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Saturday 1 March 2025',
      recurrenceRule: omissionRuleset.recurrence.rules[0],
      class: 'org.olf.internalPiece.InternalRecurrencePiece',
    },
    {
      id: '955fb65b-211a-4d15-8c48-744817686e66',
      date: '2025-04-01',
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Tuesday 1 April 2025',
      recurrenceRule: omissionRuleset.recurrence.rules[0],
      class: 'org.olf.internalPiece.InternalRecurrencePiece',
    },
    {
      id: 'dc2eacea-a5b9-460e-b965-2679be6bbd2d',
      date: '2025-05-01',
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Thursday 1 May 2025',
      recurrenceRule: omissionRuleset.recurrence.rules[0],
      class: 'org.olf.internalPiece.InternalRecurrencePiece',
    },
    {
      id: 'ab491072-0f56-4662-924d-879c88342cc5',
      date: '2025-06-01',
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Sunday 1 June 2025',
      recurrenceRule: omissionRuleset.recurrence.rules[0],
      class: 'org.olf.internalPiece.InternalRecurrencePiece',
    },
    {
      id: '776de914-73f8-45d9-ab28-f7a5389008f0',
      date: '2025-02-01',
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Saturday 1 February 2025',
      recurrenceRule: omissionRuleset.recurrence.rules[0],
      class: 'org.olf.internalPiece.InternalRecurrencePiece',
    },
    {
      id: '5f84c8a7-fe4a-484c-99fe-8ab629bc5c73',
      date: '2025-08-01',
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Friday 1 August 2025',
      recurrenceRule: omissionRuleset.recurrence.rules[0],
      class: 'org.olf.internalPiece.InternalRecurrencePiece',
    },
    {
      id: '2f0f348a-026d-4123-b6c1-1d0d99fedccc',
      date: '2025-10-01',
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Wednesday 1 October 2025',
      recurrenceRule: omissionRuleset.recurrence.rules[0],
      class: 'org.olf.internalPiece.InternalRecurrencePiece',
    },
    {
      id: '99293f8d-aa21-46e0-9a8f-174bca5138ad',
      date: '2025-09-01',
      templateString:
        '{{chronology1.weekday}} {{chronology1.monthDay}} {{chronology1.month}} {{chronology1.year}}',
      label: 'Monday 1 September 2025',
      recurrenceRule: omissionRuleset.recurrence.rules[0],
      class: 'org.olf.internalPiece.InternalRecurrencePiece',
    },
  ],
  dateCreated: '2024-11-05T12:46:11Z',
  lastUpdated: '2024-11-05T12:46:11Z',
  continuationPieceRecurrenceMetadata: {
    id: '36b13f81-6899-476d-8e16-6cb14270556e',
    userConfigured: [
      {
        id: 'c4403cd9-b476-46ec-a95b-a88302100503',
        index: 0,
        userConfiguredTemplateMetadataType: findRefdataValue(
          'UserConfiguredTemplateMetadata.UserConfiguredTemplateMetadataType',
          'chronology'
        ),
        metadataType: {
          id: '96771f99-ea46-4ecf-86b1-8a6c53f644f0',
          monthDay: '1',
          month: 'January',
          weekday: 'Thursday',
          year: '2026',
        },
      },
    ],
  },
  startDate: '2025-01-01',
  note: 'Omission piece set',
  title: 'Interesting Times',
};

export default omissionPieceSet;
