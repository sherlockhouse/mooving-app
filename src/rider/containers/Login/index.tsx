import React from 'react'
import { Component } from 'react';
import { Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { NavigationScreenProp } from 'react-navigation';
import { STORE_ACCOUNT } from '../../../common/constants';
import PhoneVerification from '../../../common/containers/PhoneVerification';

interface ILoginProps {
  [STORE_ACCOUNT]?: any;
  navigation: NavigationScreenProp<any,any>
}
interface ILoginState {
  isPhoneSubmitted: boolean
}

@inject(STORE_ACCOUNT)
@observer
export default class Home extends Component<ILoginProps, ILoginState> {

	constructor(props: ILoginProps) {
		super(props);
		this.state = {
			isPhoneSubmitted: false,
		}
	}

  public render() {
    return (<PhoneVerification/>)
  }
}
