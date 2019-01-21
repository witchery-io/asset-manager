import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SharedService {

  /*
  * Main Component SAVE settings
  * */
  saveSettings = {};

  subject: Subject<void> = new Subject<void>();

  settingsSubject: Subject<any> = new Subject<any>();

  constructor() {
  }
}
