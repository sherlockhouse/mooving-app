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
import Home from './common/containers/Home';
import Balance from './common/containers/Balance';
import stores from "./common/stores";

type Props = {};

const RootStack = createStackNavigator(
  {
    Home: Home,
    Balance: Balance,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends Component<Props> {
  render() {
    return (
      <Provider {...stores}>
        <SafeAreaView style={{ flex: 1 }}>
          <RootStack />
        </SafeAreaView>
      </Provider>
    );
  }
}
