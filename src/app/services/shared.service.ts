import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SharedService {

  subject: Subject<void> = new Subject<void>();

  constructor() { }
}
