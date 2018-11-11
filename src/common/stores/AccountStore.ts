import { observable, action, runInAction } from 'mobx';
import { IPaymentMethod } from 'ride-hailing-common';
import { getToken } from '../lib/localStorage';

export enum RequestState {
  pending = 'pending',
  done = 'done',
  error = 'error',
}

export class AccountStore {

  @observable public requestStatus: RequestState = RequestState.done;
  @observable public balance = 0;
  @observable public firstName: string = 'Moshe';
  @observable public lastName: string = '';
  @observable public phoneNumber: string = '';
  @observable public paymentMethod: IPaymentMethod = null;
  @observable public token: string | null = null;

  constructor() {
    this.loadToken();
  }

  @action('get token')
  public async loadToken() {
    this.token = await getToken();
  }

  @action('update balance')
  public async updateBalance(newBalance: number) {
    this.requestStatus = RequestState.pending;
    try {
      const response = await newBalance;
      runInAction(() => {
        this.requestStatus = RequestState.done;
        this.balance = response;
      });
    } catch (error) {
      runInAction(() => {
        this.requestStatus = RequestState.error;
      });
    }
  }

  public isLoggedIn() {
    return !!this.token;
  }
}