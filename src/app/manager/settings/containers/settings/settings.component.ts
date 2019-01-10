import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeTab } from '@app/shared/enums';
import { TabsetComponent } from 'ngx-bootstrap';
import { ACCOUNTS, GROUPS } from '@app/shared/enums/trading.enum';

@Component({
  selector: 'app-trading',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  @ViewChild('typeTabs') typeTabs: TabsetComponent;

  _defaultTabIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    let type = this.route.snapshot.paramMap.get('type');

    if (!id) {
      type = ACCOUNTS;
    }

    this.typeTabs.tabs[TypeTab[type] || this._defaultTabIndex].active = true;
  }

  onSelectTypeTab(type_tab) {
    const order_tab = this.route.snapshot.paramMap.get('tab');
    const typePromise = this._navigate(type_tab, order_tab);

    typePromise.then(() => {
      this.typeTabs.tabs[TypeTab[type_tab] || this._defaultTabIndex].active = true;
    });
  }

  private _navigate(type_tab, order_tab) {
    const id = type_tab === GROUPS ? '6a86df61-c190-4347-9b61-34cbd88d38a4' : 'edc23b04-64d8-4469-bb6a-40da55322d26'; // todo :: change
    return this.router.navigate([`../../../${type_tab}/${id}/${order_tab}/`], {relativeTo: this.route});
  }
}
