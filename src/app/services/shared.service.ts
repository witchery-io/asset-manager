import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  subject: Subject<void> = new Subject<void>();

  constructor() { }
}
