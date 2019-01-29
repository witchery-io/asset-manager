import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  authKey: string;

  constructor(
    public http: HttpClient,
  ) {
    if (ApiService.isLocalStorageSupported()) {
      this.authKey = localStorage.getItem('authKey');
    } else {
      this.authKey = '';
    }
  }

  /**
   * Is local storage available?
   */
  static isLocalStorageSupported() {
    const testKey = 'test';
    const storage = window.localStorage;

    try {
      storage.setItem(testKey, '1');
      storage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * HTTP - GET - Request
   * @param url string
   * @param params -
   * @param options -
   */
  get<T>(url: string, params?: any | {}, options = {}) {
    const httpOptions: { [k: string]: any } = {
      ...options,
    };

    return this.http.get<T>(`${url}`, httpOptions);
  }

  /**
   * HTTP - POST - Request
   * @param url string
   * @param body -
   * @param options -
   */
  post<T>(url: string, body?: any, options = {}) {
    return this.http.post<T>(`${url}`, body, options);
  }

  /**
   * Set auth key and save to storage (in our case to local storage)
   */
  setAuthKey(key) {
    this.authKey = key;

    if (ApiService.isLocalStorageSupported()) {
      localStorage.setItem('authKey', key);
    }
  }
}
