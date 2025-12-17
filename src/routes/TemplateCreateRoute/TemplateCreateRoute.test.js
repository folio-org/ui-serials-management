import { MemoryRouter } from 'react-router-dom';
import { renderWithIntl } from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../../test/helpers';
import TemplateCreateRoute from './TemplateCreateRoute';
import * as utils from '../../components/utils';

let capturedFormProps;

jest.mock('react-final-form', () => ({
  Form: (props) => {
    capturedFormProps = props;
    const handleSubmit = (values) => props.onSubmit(values);
    return props.children({ handleSubmit });
  },
}));

const mockMutateAsync = jest.fn();

jest.mock('react-query', () => {
  const actual = jest.requireActual('react-query');

  return {
    ...actual,
    useMutation: jest.fn(() => ({
      mutateAsync: mockMutateAsync,
    })),
  };
});

jest.mock('@folio/stripes-core', () => ({
  ...jest.requireActual('@folio/stripes-core'),
  useOkapiKy: jest.fn(() => ({ post: jest.fn() })),
}));

const mockHistoryPush = jest.fn();
const mockLocation = { search: '?filters=modelRulesetStatus.active' };

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({ push: mockHistoryPush }),
  useLocation: () => mockLocation,
}));

jest.mock('../../components/utils', () => ({
  urls: {
    templateView: jest.fn((id) => `/serials-management/modelRulesets/${id}`),
    templates: jest.fn(() => '/serials-management/modelRulesets'),
  },
  getRulesetFormValues: jest.fn(() => ({ fromRuleset: 'yes' })),
  rulesetSubmitValuesHandler: jest.fn(() => ({ fake: 'serialRuleset' })),
}));

let mockLatestHandlers;

jest.mock('../../components/views', () => ({
  TemplateForm: ({ handlers }) => {
    mockLatestHandlers = handlers;
    return <div>TemplateForm</div>;
  },
}));

let renderComponent;

describe('TemplateCreateRoute', () => {
  beforeEach(() => {
    mockMutateAsync.mockClear();
    utils.rulesetSubmitValuesHandler.mockClear();
    utils.getRulesetFormValues.mockClear();
    utils.urls.templateView.mockClear();
    utils.urls.templates.mockClear();
    mockHistoryPush.mockClear();
    mockLatestHandlers = undefined;

    renderComponent = renderWithIntl(
      <MemoryRouter>
        <TemplateCreateRoute />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the TemplateForm component', () => {
    const { getByText } = renderComponent;
    expect(getByText('TemplateForm')).toBeInTheDocument();
  });

  test('calls submitTemplate with mapped values and uses rulesetSubmitValuesHandler', async () => {
    expect(mockLatestHandlers).toBeDefined();

    await mockLatestHandlers.onSubmit({
      rulesetStatus: { value: 'active' },
    });

    expect(utils.rulesetSubmitValuesHandler).toHaveBeenCalledTimes(1);

    const handlerArg = utils.rulesetSubmitValuesHandler.mock.calls[0][0];
    expect(handlerArg).toEqual({
      rulesetStatus: { value: 'active' },
    });

    expect(mockMutateAsync).toHaveBeenCalledWith(
      expect.objectContaining({
        modelRulesetStatus: { value: 'active' },
        serialRuleset: { fake: 'serialRuleset' },
      }),
    );
  });

  test('handleClose navigates to templates list when called without id', () => {
    expect(mockLatestHandlers).toBeDefined();

    mockLatestHandlers.onClose();

    expect(utils.urls.templates).toHaveBeenCalled();
    expect(mockHistoryPush).toHaveBeenCalledWith('/serials-management/modelRulesets?filters=modelRulesetStatus.active');
  });

  test('handleClose navigates to template view when called with id', () => {
    expect(mockLatestHandlers).toBeDefined();

    mockLatestHandlers.onClose('1234');

    expect(utils.urls.templateView).toHaveBeenCalledWith('1234');
    expect(mockHistoryPush).toHaveBeenCalledWith('/serials-management/modelRulesets/1234?filters=modelRulesetStatus.active');
  });

  test('sets initialValues to rulesetStatus active when not copying', () => {
    expect(capturedFormProps).toBeDefined();
    expect(capturedFormProps.initialValues).toEqual({
      rulesetStatus: { value: 'active' },
    });
  });

  test('sets initialValues from copyFrom template + serialRuleset', () => {
    mockLocation.state = {
      copyFrom: {
        name: 'My Template',
        description: 'Copied description',
        exampleLabel: 'Vol. 1',
        serialRuleset: { some: 'ruleset' },
      },
    };

    utils.getRulesetFormValues.mockReturnValueOnce({
      rulesetStatus: { value: 'active' },
      recurrence: { period: '3' },
    });

    renderComponent = renderWithIntl(
      <MemoryRouter>
        <TemplateCreateRoute />
      </MemoryRouter>,
      translationsProperties
    );

    expect(utils.getRulesetFormValues).toHaveBeenCalledWith({ some: 'ruleset' });

    expect(capturedFormProps.initialValues).toEqual(
      expect.objectContaining({
        rulesetStatus: { value: 'active' },
        recurrence: { period: '3' },
        name: 'Copy of: My Template',
        modelRulesetDescription: 'Copied description',
        exampleLabel: 'Vol. 1',
      })
    );
  });
});
