import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
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

  role = 'admin';
  faPlus = faPlus;
  faEdit = faEdit;
  modalRef: BsModalRef;

  @Input()
  id: string;

  @Input()
  section: any;

  constructor(
    private modalService: ModalService,
  ) {
  }

  get accounts() {
    return getAccountsFromSection(this.section);
  }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>, options = {}) {
    this.modalRef = this.modalService.show(template, options);
  }

  selectAccount() {
    // code ...
  }

  edit() {

  }
}
