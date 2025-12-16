import {
  renderWithIntl,
  KeyValue,
  TestForm,
  TextArea,
  TextField,
} from '@folio/stripes-erm-testing';
import ModelRulesetInfoForm from './ModelRulesetInfoForm';
import { refdata as mockRefdata } from '../../../../test/resources';

import { translationsProperties } from '../../../../test/helpers';

const onSubmit = jest.fn();

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  useSerialsManagementRefdata: () => mockRefdata,
}));

describe('ModelRulesetInfoForm', () => {
  beforeEach(() => {
    renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <ModelRulesetInfoForm />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders the Name field', async () => {
    await TextField('Pattern template name*').exists();
  });

  test('renders the expected Status', async () => {
    await KeyValue('Pattern template status').has({ value: 'Active' });
  });

  test('renders the Description field', async () => {
    await TextArea('Pattern template description').exists();
  });

  test('renders the Example label field', async () => {
    await TextField('Example label').exists();
  });
});
