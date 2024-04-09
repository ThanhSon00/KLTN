import { configureStore /* StoreEnhancer */ } from '@reduxjs/toolkit';
// import { createInjectorsEnhancer } from 'redux-injectors';
// import createSagaMiddleware from 'redux-saga';
import { createReducer } from './reducers';
import authReducer from 'app/components/SignInPanel/slice';
import panelReducer from 'app/components/SignUpPanel/slice';
import alertReducer from 'app/components/AlertMessage/slice';
import authMessageReducer from 'app/components/AuthMessage/slice';
import loadingIndicatorReducer from 'app/components/PanelSubmitButton/slice';

export const store = configureAppStore();
export function configureAppStore() {
  // const reduxSagaMonitorOptions = {};
  // const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  // const { run: runSaga } = sagaMiddleware;

  // Create the store with saga middleware
  // const middlewares = [sagaMiddleware];

  const store = configureStore({
    reducer: createReducer({
      authState: authReducer,
      panelState: panelReducer,
      alertState: alertReducer,
      authMessageState: authMessageReducer,
      loadingIndicatorState: loadingIndicatorReducer,
    }),
    // middleware: defaultMiddleware => [...defaultMiddleware(), ...middlewares],
  });

  return store;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
