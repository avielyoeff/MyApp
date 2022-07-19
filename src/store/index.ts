import {
  applyMiddleware,
  compose as reduxCompose,
  createStore,
  StoreEnhancer,
} from 'redux';
import { useCallback } from 'react';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { useDispatch as _useDispatch } from 'react-redux';

import rootReducer from '../reducers';

// If on __DEV__ will use redux-devtools-extension compose,
// otherwise it wll use default redux compose function.
function getCompose(): (
  x?: ReturnType<typeof applyMiddleware>,
) => StoreEnhancer {
  if (__DEV__) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { composeWithDevTools } = require('redux-devtools-extension');

    return composeWithDevTools;
  }

  return reduxCompose;
}

/**
 * @name getMiddlewares
 * If on __DEV__ will some development middleware will be pushed,
 * otherwise it not push them and use defaults.
 */

// preloadedState is the initial state.
// can be used to restore a previously serialized user session.
// If you use `combineReducers` to produce the root reducer function,
// this must be an object with the same shape as `combineReducers` keys.
function configureStore(preloadedState?: any): any {
  const middlewareEnhancer = applyMiddleware(thunkMiddleware);

  const enhancers = [middlewareEnhancer];
  const compose = getCompose();
  const composedEnhancers = compose(...enhancers);
  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}

export function useDispatch(): (event: any) => void {
  const dispatch = _useDispatch();
  const fn = useCallback(
    (event) => {
      dispatch(event);
    },
    [dispatch],
  );

  return fn;
}

export default configureStore;
