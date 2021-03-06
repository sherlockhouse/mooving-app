import React from 'react'
import { Component } from 'react';
import { Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { NavigationScreenProp } from 'react-navigation';
import { STORE_ACCOUNT } from '../../constants';
import styles from './styles';

interface HomeContainerProps {
  [STORE_ACCOUNT]?: any;
  language: any;
  navigation: NavigationScreenProp<any,any>
}

@inject(STORE_ACCOUNT, 'language')
@observer
export default class Home extends Component<HomeContainerProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome {this.props[STORE_ACCOUNT].firstName}!</Text>
        <Text style={styles.welcome}>
          Your language is set to { this.props.language }
        </Text>
        <Text style={styles.instructions} onPress={() => this.props.navigation.navigate('Balance')}>Show balances</Text>
        <Text style={styles.instructions} onPress={() => this.props.navigation.navigate('Map')}>Show Map</Text>
      </View>
    );
  }
}
