import React from 'react';
import Character from './Character';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import { Http } from '@breakingbad/services/Http';
import { cleanup } from '@testing-library/react';

const mockResponse = { name: 'Test', occupation: [], appearance: [] };
let historyReplaceCalled = false;

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
    replace: jest.fn(() => historyReplaceCalled = true)
  }),
  useParams: () => ({
    id: 1
  })
}));

jest.mock('@breakingbad/utils/Http', () => ({
  get: () => Promise.resolve(mockResponse),
}));

const mockStore = configureStore([thunk]);

describe('Character Component', () => {
  let store: any;
  let component: any;

  beforeEach(() => {
    React.useState = jest.fn().mockReturnValue([false, {}])

    store = mockStore({
      character: { value: mockResponse, quote: { quote: 'Test'}},
    });

    store.dispatch = jest.fn().mockImplementation(() => ({
      unwrap: () => Promise.resolve(mockResponse)
    }));

    component = renderer.create(
      <Provider store={store}>
        <Character />
      </Provider>
    );
  });

  afterEach(cleanup)

  it('should dispatch an action on button click', () => {
    renderer.act(() => {
      component.root.findAllByType('button')[1].props.onClick();
    });

    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should redirect to not-found if no character', () => {
    jest.spyOn(Http, 'get').mockImplementation(() => Promise.reject({ data: [] }));
    renderer.act(() => {
      expect(historyReplaceCalled).toBeTruthy();
    });
  });
});
