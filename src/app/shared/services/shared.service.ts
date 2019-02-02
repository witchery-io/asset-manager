import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SharedService {

  private settingsSubject: Subject<any> = new Subject<any>();

  /*
  * Main Component SAVE settings
  * */
  saveSettings = {};

  subject: Subject<void> = new Subject<void>();

  constructor() {
  }

  setSettings(params) {
    this.settingsSubject.next(params);
  }

  getSettings(): Observable<any> {
    return this.settingsSubject.asObservable();
  }
}
