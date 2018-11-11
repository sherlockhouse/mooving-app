import React from 'react';
import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { NavigationScreenProp } from 'react-navigation';
import { STORE_ACCOUNT } from '../../../common/constants';
import { AccountStore } from '../../../common/stores/AccountStore';
import CodeVerification from './CodeVerification';
import Phone from './Phone';

interface ILoginProps {
  [STORE_ACCOUNT]?: AccountStore;
  navigation?: NavigationScreenProp<any,any>
}
interface ILoginState {
  isPhoneSubmitted: boolean
}

@inject(STORE_ACCOUNT)
@observer
export default class PhoneVerification extends Component<ILoginProps, ILoginState> {

	constructor(props: ILoginProps) {
		super(props);
		this.state = {
			isPhoneSubmitted: false,
		}
	}

  public render() {
    if (this.state.isPhoneSubmitted) {
			return <CodeVerification/>
		} else {
			return <Phone/>
		}
  }
}
