import { renderWithIntl, TestForm, KeyValue } from '@folio/stripes-erm-testing';

import GenerateReceivingModal from './GenerateReceivingModal';
import { translationsProperties } from '../../../test/helpers';

import { serial, pieceSet } from '../../../test/resources';

const onSubmit = jest.fn();

describe('GenerateReceivingModal', () => {
  beforeEach(() => {
    renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <GenerateReceivingModal
          holdingIds={null}
          pieceSet={pieceSet}
          serial={serial}
        />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders the expected category', async () => {
    await KeyValue('Total pieces').has({ value: '12' });
  });
});
