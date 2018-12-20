import { Component, OnInit } from '@angular/core';
import { faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isCollapsed = true;
  faSignOutAlt = faSignOutAlt;
  faCogs = faCogs;

  constructor() { }

  ngOnInit() {
  }

  get name() {
    return 'user name';
  }
}
