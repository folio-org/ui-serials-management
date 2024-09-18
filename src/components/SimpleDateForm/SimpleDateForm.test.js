import React from 'react';
import { renderWithIntl, Datepicker, Button } from '@folio/stripes-erm-testing';
import { waitFor, screen } from '@folio/jest-config-stripes/testing-library/react';
import SimpleDateForm from './SimpleDateForm';

describe('SimpleDateForm', () => {
  test('Button should be enabled when date is valid', async () => {
    renderWithIntl(<SimpleDateForm />);

    await waitFor(async () => {
      const dateInput = Datepicker({ id: 'ruleset-start-date' });
      await dateInput.focus();
      await dateInput.fillIn('01/30/2024');
      await dateInput.blur();
      screen.debug();
    });

    await Datepicker({ id: 'ruleset-start-date' }).has({ inputValue: '01/30/2024' });

    await Button({ id: 'submit-button' }).has({ disabled: false });
    // screen.debug();
  });
});
