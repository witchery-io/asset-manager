import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent implements OnInit {

  @Input()
  position: any;

  constructor() {}

  ngOnInit() {}

}
