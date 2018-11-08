/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { SafeAreaView } from "react-native";
import { Provider } from 'mobx-react'
import RNLanguages from 'react-native-languages';
import Home from './common/containers/Home';
import Balance from './common/containers/Balance';
import stores from "./common/stores";

type Props = {};

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        title: `Home`,
        headerBackTitle: null
      }),
    },
    Balance: {
      screen: Balance,
      navigationOptions: () => ({
        title: `Balance`,
        headerBackTitle: null
      }),
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends Component<Props> {
  render() {
    return (
      <Provider {...stores} language={RNLanguages.language} >
        <SafeAreaView style={{ flex: 1 }}>
          <RootStack />
        </SafeAreaView>
      </Provider>
    );
  }
}
