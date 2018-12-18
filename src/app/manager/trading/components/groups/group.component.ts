import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.styl']
})
export class GroupComponent implements OnInit {
  @Input()
  group: any;

  constructor() { }

  ngOnInit() {}
}
