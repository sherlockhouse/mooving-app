import { observable, action, runInAction } from 'mobx';

export enum RequestState {
  pending = 'pending',
  done = 'done',
  error = 'error',
}

export class AccountStore {

  @observable public requestStatus: RequestState;
  @observable public balance = 0;
  @observable public firstName: string = 'Moshe';
  @observable public lastName: string;

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
}