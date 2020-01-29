/**
 * @format
 * @flow
 */

import React from 'react';
import { createAppContainer } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux'
import store from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen.js'
import QuizScreen from './src/screens/QuizScreen.js'
import ResultScreen from './src/screens/ResultScreen.js'

const SwitchNavigator = createAnimatedSwitchNavigator(
  {
    Home: HomeScreen,
    Quiz: QuizScreen,
    Result: ResultScreen
  },
  {
    transition: (
      <Transition.Together>
        <Transition.Out
          type="fade"
          durationMs={100}
          interpolation="easeIn"
        />
        <Transition.In type="scale" durationMs={1000} />
      </Transition.Together>
    )
  }
);

const AppContainer = createAppContainer(SwitchNavigator);

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppContainer />
      </PaperProvider>
    </Provider>
  )
}


export default App;
