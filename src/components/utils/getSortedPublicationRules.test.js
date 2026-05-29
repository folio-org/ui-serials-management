import getSortedPublicationRules from './getSortedPublicationRules';

describe('getSortedPublicationRules', () => {
  it('sorts year_date rules by ordinal, month, and day', () => {
    const rules = [
      {
        ordinal: '2',
        pattern: {
          month: { value: 'march' },
          day: '1',
        },
      },
      {
        ordinal: '1',
        pattern: {
          month: { value: 'February' },
          day: '2',
        },
      },
      {
        ordinal: '1',
        pattern: {
          month: { value: 'january' },
          day: '31',
        },
      },
    ];

    const sortedRules = getSortedPublicationRules(rules, 'year_date');

    expect(sortedRules.map((rule) => rule.pattern.month.value)).toEqual([
      'january',
      'February',
      'march',
    ]);
    expect(sortedRules.map((rule) => rule.pattern.day)).toEqual(['31', '2', '1']);
  });

  it('falls back to ordinal sorting when patternType is missing', () => {
    const rules = [
      { ordinal: '3' },
      { ordinal: '1' },
      { ordinal: '2' },
    ];

    const sortedRules = getSortedPublicationRules(rules);

    expect(sortedRules.map((rule) => rule.ordinal)).toEqual(['1', '2', '3']);
  });
});
