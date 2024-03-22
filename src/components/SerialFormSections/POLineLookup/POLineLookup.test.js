import { MemoryRouter } from 'react-router-dom';
import { renderWithIntl, Button } from '@folio/stripes-erm-testing';

import POLineLookup from './POLineLookup';
import { translationsProperties } from '../../../../test/helpers';
import { resource, input } from '../../../../test/resources/poline';


const emptyInput = {
  name: 'orderLine',
  value: '',
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
};
const onResourceSelected = jest.fn();
const removePOLine = jest.fn();

describe('POLineLookup', () => {
  describe('with no POLine linked', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <POLineLookup
            id="po-line-field"
            input={emptyInput}
            onResourceSelected={onResourceSelected}
            removePOLine={removePOLine}
          >
            <div>CHILD COMPONENT</div>
          </POLineLookup>
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the card header', async () => {
      const { getByText } = renderComponent;
      expect(getByText('PO line')).toBeInTheDocument();
    });

    test('renders the expected text', async () => {
      const { getByText } = renderComponent;
      expect(getByText('No "find-po-line" plugin is installed')).toBeInTheDocument();
    });

    test('does not render the child component', async () => {
      const { queryByText } = renderComponent;
      expect(queryByText('CHILD COMPONENT')).not.toBeInTheDocument();
    });

    test('renders the expected empty layout', async () => {
      const { getByText } = renderComponent;
      expect(getByText('No PO line linked')).toBeInTheDocument();
    });

    test('renders the expected empty message', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Link a PO line to get started')).toBeInTheDocument();
    });
  });

  describe('with POLine linked', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <POLineLookup
            id="po-line-field"
            input={input}
            onResourceSelected={onResourceSelected}
            removePOLine={removePOLine}
            resource={resource}
          >
            <div>CHILD COMPONENT</div>
          </POLineLookup>
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders a link with poline', async () => {
      const { getByRole } = renderComponent;
      expect(getByRole('link', { name: 'PO line: 52590-1' })).toBeInTheDocument();
    });

    test('renders the expected child component', async () => {
      const { getByText } = renderComponent;
      expect(getByText('CHILD COMPONENT')).toBeInTheDocument();
    });

    test('does not render the expected empty layout', async () => {
      const { queryByText } = renderComponent;
      expect(queryByText('No PO line linked')).not.toBeInTheDocument();
    });

    test('renders the PO line button', async () => {
      await Button('PO line: 52590-1').exists();
    });
  });
});
