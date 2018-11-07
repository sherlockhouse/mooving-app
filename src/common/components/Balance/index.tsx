import React from 'react';
import {Button, Text, View} from 'react-native';
import styles from './styles';

export interface Props {
  balance?: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

type State = {};

export class Balance extends React.Component<Props, State> {

  onIncrement = () =>
    this.props.onIncrement();
  onDecrement = () =>
    this.props.onDecrement();

  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.greeting}>
          Your balance is {this.props.balance}!
        </Text>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button
              title="-"
              onPress={this.onDecrement}
              accessibilityLabel="decrement"
              color="red"
            />
          </View>

          <View style={styles.button}>
            <Button
              title="+"
              onPress={this.onIncrement}
              accessibilityLabel="increment"
              color="blue"
            />
          </View>
        </View>
      </View>
    );
  }
}