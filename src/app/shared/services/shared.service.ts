import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SharedService {

  private settingsSubject: Subject<any> = new Subject<any>();

  /*
  * Main Component SAVE settings
  * */
  _saveSettings = {};

  subject: Subject<void> = new Subject<void>();

  constructor() {
  }

  setSettingsObs(params) {
    this.settingsSubject.next(params);
  }

  getSettingsObs(): Observable<any> {
    return this.settingsSubject.asObservable();
  }

  get sParams() {
    return this._saveSettings;
  }

  setSParams(name, params) {
    if (!name) {
      return;
    }

    if (!params) {
      return;
    }

    this._saveSettings[name] = {
      ...this._saveSettings[name],
      ...params,
    };
  }
}
