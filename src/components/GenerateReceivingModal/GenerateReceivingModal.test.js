import { useState } from 'react';
import { useMutation } from 'react-query';

import { renderWithIntl, Button, Modal } from '@folio/stripes-erm-testing';

import GenerateReceivingModal from './GenerateReceivingModal';

import { translationsProperties } from '../../../test/helpers';
import {
  pieceSet,
  serial,
  holdings as mockHoldings,
  locations as mockLocations,
} from '../../../test/resources';

jest.mock('./GenerateReceivingModalInfo', () => () => (
  <div>GenerateReceivingModalInfo</div>
));
// jest.mock('./GenerateReceivingModalForm', () => () => (<div>GenerateReceivingModalForm</div>));

jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  useLocations: () => ({ isLoading: false, data: mockLocations }),
  useHoldings: () => ({ isLoading: false, data: mockHoldings }),
}));

/* EXAMPLE Mocking useMutation to allow us to test the .then clause */
// Setting up jest fn here to test paramters passed in by component
const mockPreview = jest.fn(() => Promise.resolve(true));
const mockGenerate = jest.fn(() => Promise.resolve(true));
jest.mock('react-query', () => {
  const { mockReactQuery } = jest.requireActual('@folio/stripes-erm-testing');

  return {
    ...jest.requireActual('react-query'),
    ...mockReactQuery,
    useMutation: jest.fn((key, func) => ({
      mutateAsync: (...incomingParams) => {
        // Actually call function coming from component
        // This assumes that ky has been mocked, which it should have been by __mocks__ stripes-core.

        // If this function was async, we might need to do something different.
        // As it is, it's a synchronous call to ky which returns a promise we then chain on.
        func();

        // Ensure we return the promise resolve from above, so that any _subsequent_ .then calls can flow
        if (key.includes('submitReceivingPiece')) {
          return mockPreview(...incomingParams);
        }
        return mockGenerate(...incomingParams);
      },
    })),
  };
});

const TestComponent = () => {
  // We need actual state in here for close test
  const [showModal, setShowModal] = useState(true);

  return (
    <GenerateReceivingModal
      orderLine={serial?.orderLine}
      pieceSet={pieceSet}
      setShowModal={setShowModal}
      showModal={showModal}
    />
  );
};

let renderComponent;
// TODO this test complains about rendering forwardRef... Maybe it's the formModal stuff. Again though, we ought to fix that.
describe('GenerateReceivingModal', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(<TestComponent />, translationsProperties);
  });

  test('useMutation has been called', () => {
    expect(useMutation).toHaveBeenCalled();
  });

  test('renders the modal', async () => {
    await Modal('Generate receiving pieces').exists();
  });

  // test('renders the GenerateReceivingModalInfo component', () => {
  //   const { getByText } = renderComponent;
  //   expect(getByText('GenerateReceivingModalInfo')).toBeInTheDocument();
  // });

  // test('renders the GenerateReceivingModalInfo component', () => {
  //   const { getByText } = renderComponent;
  //   expect(getByText('GenerateReceivingModalForm')).toBeInTheDocument();
  // });

  test('renders the Generate receiving pieces button', async () => {
    await Button({ id: 'generate-recieving-pieces-button' }).has({
      disabled: true,
    });
  });
});
