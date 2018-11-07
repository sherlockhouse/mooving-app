import React from 'react'
import { Component } from 'react';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { STORE_ACCOUNT } from '../../constants';
import { Balance } from '../../components/Balance';
import styles from './styles';

type BalanceContainerProps = {
  [STORE_ACCOUNT]?: any;
};

@inject(STORE_ACCOUNT)
@observer
export default class BalanceContainer extends Component<BalanceContainerProps> {
  render() {
    const balance = this.props[STORE_ACCOUNT].balance;
    return (
      <View style={styles.container}>
      <Balance 
        balance={ balance }
        onIncrement={ () => { this.props[STORE_ACCOUNT].updateBalance(balance + 1) } }
        onDecrement={ () => { this.props[STORE_ACCOUNT].updateBalance(balance - 1) } }
      />
      </View>
    );
  }
}