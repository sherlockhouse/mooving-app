import React from 'react'
import { Component } from 'react';
import { Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Hello } from '../../components/Hello';
import { STORE_ACCOUNT } from '../../constants';
import styles from './styles';

type Props = {};

@inject(STORE_ACCOUNT)
@observer
export default class Home extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome {this.props[STORE_ACCOUNT].firstName}!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
      </View>
    );
  }
}
