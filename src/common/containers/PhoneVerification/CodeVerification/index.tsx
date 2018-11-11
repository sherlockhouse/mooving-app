import React from 'react'
import { Component } from 'react';
import { Text, View } from 'react-native';
import { inject } from 'mobx-react';

interface ILoginProps {
    language?: any;
}

@inject('language')
export default class Home extends Component<ILoginProps> {

	constructor(props: ILoginProps) {
		super(props);
		this.state = {
			isPhoneSubmitted: false,
		}
	}

  public render() {
    return (<View><Text>Code</Text></View>)
  }
}
