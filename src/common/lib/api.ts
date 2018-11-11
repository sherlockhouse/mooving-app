import { Observable, interval, from } from 'rxjs';
import { OperationOptions, operation as Operation } from 'retry';
import { map, mergeAll } from 'rxjs/operators';

export default abstract class Api {
  protected apiAddress = 'http://192.168.1.13:3005';

  protected setJsonHeader(headers: Headers): void {
    headers.append('Content-Type', 'application/json');
  }

  protected setAuthTokenHeader(headers: Headers, token: string): void {
    if (token !== null) {
      headers.append('Authorization', `bearer ${token}`);
    }
  }

  protected abstract getVerifyCodeEndpointName(): string;

  public async fetchOnce(uri: string, requestOptions: RequestInit, timeout: number = 10000): Promise<Response> {
    const endpointUri = `${this.apiAddress}${uri[0] === '/' ? '' : '/'}${encodeURI(uri)}`;
    let timeoutCancel;
    const timeoutPromise = new Promise<Response>(resolve => {
      timeoutCancel = setTimeout(() => resolve({ status: 999, statusText: 'Request timed out' } as Response), timeout);
    });
    const response = await Promise.race([fetch(endpointUri, requestOptions), timeoutPromise]);
    if (timeoutCancel) {
      clearTimeout(timeoutCancel);
    }
    if (response.ok) {
      return response;
    } else {
      throw response;
    }
  }

  public fetchRetry(uri: string, requestOptions: RequestInit, timeout: number = 10000,
    retryOptions: OperationOptions = {}): Promise<Response> {
    retryOptions = {
      retries: 10,
      minTimeout: 1000,
      maxTimeout: 20000,
      forever: false,
      factor: 2.0,
      randomize: true,
      ...retryOptions,
    };
    const operation = Operation(retryOptions);
    return new Promise((resolve, reject) => {
      operation.attempt(() => {
        this.fetchOnce(uri, requestOptions).then(
          response => resolve(response),
          err => {
            if (err.status >= 500) {
              if (!operation.retry(err)) {
                reject(operation.mainError());
              }
            } else {
              reject(err);
            }
          },
        );
      });
    });
  }

  public fetchPolling(uri: string, requestOptions: RequestInit): Observable<Response> {
    const source = interval(2000).pipe(map(() => from(
      this.fetchRetry(uri, requestOptions).then(v => v, err => err))), mergeAll());
    return source;
  }

  public async sendSMS(phoneNumber: string, countryCode: string) {
    return await this.fetchRetry(`sms?phoneNumber=${phoneNumber}&countryCode=${countryCode}`, {
      method: 'POST',
    });
  }

  public async verifyCode(phoneNumber: string, countryCode: string, verificationCode: string) {
    const verifyCodeEndpoint = this.getVerifyCodeEndpointName();
    return (await this.fetchRetry(`${verifyCodeEndpoint}?phoneNumber=${phoneNumber}&countryCode=${countryCode}&verificationCode=${verificationCode}`, {}))
      .json();
  }
}
