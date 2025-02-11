import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import {
  renderWithIntl,
  TestForm,
  TextArea,
  Select,
} from '@folio/stripes-erm-testing';
import RulesetInfoForm from './RulesetInfoForm';
import { refdata as mockRefdata } from '../../../../test/resources';

import { translationsProperties } from '../../../../test/helpers';

const onSubmit = jest.fn();

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  useSerialsManagementRefdata: () => mockRefdata,
}));

let renderComponent;
describe('RulesetInfoForm', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <RulesetInfoForm />
      </TestForm>,
      translationsProperties
    );
  });

  it('renders expected selection title', async () => {
    await Select('Status*').exists();
  });

  test('renders description label', async () => {
    await TextArea('Description').exists();
  });

  test('renders the expected description label', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Description')).toBeInTheDocument();
  });

  test('renders the Status dropdown with correct options', async () => {
    await Select('Status*').exists();
    await waitFor(async () => {
      await Select('Status*').choose('Active');
      await Select('Status*').choose('Deprecated');
      await Select('Status*').choose('Draft');
    });
  });
});
