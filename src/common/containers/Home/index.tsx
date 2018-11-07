import React from 'react'
import { Component } from 'react';
import { Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { NavigationScreenProp } from 'react-navigation';
import { STORE_ACCOUNT } from '../../constants';
import styles from './styles';

interface HomeContainerProps {
  navigation: NavigationScreenProp<any,any>
}

@inject(STORE_ACCOUNT)
@observer
export default class Home extends Component<HomeContainerProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome {this.props[STORE_ACCOUNT].firstName}!</Text>
        <Text style={styles.instructions} onPress={() => this.props.navigation.navigate('Balance')}>To get started, edit App.js</Text>
      </View>
    );
  }
}
