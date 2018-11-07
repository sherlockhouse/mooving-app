import React from 'react'
import { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

type Props = {};
export default class Balance extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
      </View>
    );
  }
}