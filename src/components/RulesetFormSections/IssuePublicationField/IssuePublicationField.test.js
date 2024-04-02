import { MemoryRouter } from 'react-router-dom';
import { renderWithIntl, TestForm, Button } from '@folio/stripes-erm-testing';
import mockRefdata from '../../../../test/resources/refdata';
import IssuePublicationField from './IssuePublicationField';
import { translationsProperties } from '../../../../test/helpers';

const onSubmit = jest.fn();

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  useSerialsManagementRefdata: () => mockRefdata,
}));

describe('IssuePublicationField', () => {
  beforeEach(() => {
    renderWithIntl(
      <MemoryRouter>
        <TestForm onSubmit={onSubmit}>
          <IssuePublicationField
            index={0}
            name="recurrence.rules"
            patternType="year_date"
          />
        </TestForm>
        ,
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the submit button', async () => {
    await Button('Submit').exists();
  });
});
