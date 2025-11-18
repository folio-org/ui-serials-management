import { renderWithIntl, KeyValue } from '@folio/stripes-erm-testing';

import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min';

import { translationsProperties } from '../../../test/helpers';

import { template } from '../../../test/resources';

import TemplateInfo from './TemplateInfo';


describe('TemplateInfo', () => {
  describe('with a standard template', () => {
    beforeEach(() => {
      renderWithIntl(
        <MemoryRouter>
          <TemplateInfo template={template} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test.each([
      { keyValueLabel: 'Status', value: 'Active' },
      { keyValueLabel: 'Description', value: '12x per year, two level of enumeration' },
      { keyValueLabel: 'Example label', value: 'Vol. 97, Issue 1. 2025' },
    ])(
      'renders KeyValue component with label $keyValueLabel with value $value ',
      async ({ keyValueLabel, value }) => {
        await KeyValue(keyValueLabel).has({ value });
      }
    );
  });
});
