import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService extends BsModalService {

  closeAllModals() {
    for (let i = 1; i <= this.getModalsCount(); i++) {
      this.hide(i);
    }
  }
}
