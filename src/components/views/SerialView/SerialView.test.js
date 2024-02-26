import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';
import { translationsProperties } from '../../../../test/helpers';
import SerialView from './SerialView';
import { handlers, serial } from '../../../../test/resources';

jest.mock('../../SerialSections/SerialInfo', () => () => <div>SerialInfo</div>);
jest.mock('../../SerialSections/SerialPOLine', () => () => (
  <div>SerialPOLine</div>
));
jest.mock('../../SerialSections/ActivePublicationPattern', () => () => (
  <div>ActivePublicationPattern</div>
));
jest.mock('../../SerialSections/DeprecatedPublicationPatterns', () => () => (
  <div>DeprecatedPublicationPatterns</div>
));

describe('SerialView', () => {
  let renderComponent;
  describe('renders components with no serial', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <SerialView
            onClose={handlers.onClose}
            queryProps={{ isLoading: false }}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders SerialInfo Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('SerialInfo')).toBeInTheDocument();
    });

    test('renders ActivePublicationPattern Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('ActivePublicationPattern')).toBeInTheDocument();
    });
  });

  describe('renders components with serial', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <SerialView
            onClose={handlers.onClose}
            queryProps={{ isLoading: false }}
            serial={serial}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders SerialInfo Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('SerialInfo')).toBeInTheDocument();
    });

    test('renders SerialPOLine Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('SerialPOLine')).toBeInTheDocument();
    });

    test('renders ActivePublicationPattern Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('ActivePublicationPattern')).toBeInTheDocument();
    });

    test('renders DeprecatedPublicationPatterns Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('DeprecatedPublicationPatterns')).toBeInTheDocument();
    });
  });
});
