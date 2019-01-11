import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups-tab-account',
  templateUrl: './groups-tab-account.component.html',
  styleUrls: ['./groups-tab-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsTabAccountComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
