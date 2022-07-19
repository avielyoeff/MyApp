import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native';
import Navigation from './src/components/navigation';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import configureStore from './src/store';
import produce from 'immer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function getInitialReducerState() {
  const newState = {
    data: { image: '' },
  };

  return newState;
}

export function getPreloadedState() {
  const store = produce(getInitialReducerState(), (draft) => {
    // systemReducer
    draft.data.image = '';
  });

  const $state = configureStore(store);
  return $state;
}

function App(): JSX.Element {
  const store = useRef(getPreloadedState()).current;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider {...{ store }}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <Navigation />
          </SafeAreaProvider>
        </QueryClientProvider>
      </Provider>
    </SafeAreaView>
  );
}

export default App;
