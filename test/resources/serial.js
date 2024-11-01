import ruleset from './ruleset';
import orderLine from './externalResources/orderLine';
import { findRefdataValue } from './utils';

const serial = {
  id: '9be5cebf-c676-4430-9439-4f47973d8a47',
  serialRulesets: [ruleset],
  dateCreated: '2024-02-26T09:58:02Z',
  lastUpdated: '2024-02-26T09:58:02Z',
  orderLine: {
    id: '2c9180a58de0851d018de4d99aea0062',
    remoteId: 'baec48dd-1594-2712-be8f-de336bc83fcc',
    remoteId_object: orderLine,
    titleId: '7cef39f1-4fb1-49d5-9a6b-a072e632144d',
    title: 'Interesting Times',
    owner: {
      id: '9be5cebf-c676-4430-9439-4f47973d8a47',
    },
  },
  notes: [
    {
      id: '119f5274-95f4-4c75-9688-8a8ce267c333',
      note: 'Test Note',
    },
  ],
  description: 'Test Description',
  serialStatus: findRefdataValue('Serial.SerialStatus', 'active'),
};

export default serial;
