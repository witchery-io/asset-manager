import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getAccountsFromSection } from '@app/core/reducers';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { ModalService } from '@app/shared/services';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-accounts-tab',
  templateUrl: 'accounts-tab.component.html',
  styleUrls: ['./accounts-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsTabComponent implements OnInit {

  @Input()
  id: string;

  @Input()
  section: any;

  role = 'admin';
  faPlus = faPlus;
  faEdit = faEdit;
  modalRef: BsModalRef;
  formValues: any;

  constructor(
    private modalService: ModalService,
  ) {
  }

  get accounts() {
    return getAccountsFromSection(this.section);
  }

  ngOnInit() {
  }

  openModal(template: any, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  edit(account, template: any, options = {}) {
    this.formValues = account;
    this.openModal(template, options);
  }

  selectAccount(id) {
    debugger
    // code ...
  }
}
