import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tick',
  templateUrl: './tick.component.html',
  styleUrls: ['./tick.component.scss']
})
export class TickComponent implements OnInit {

  @Input()
  tick: any;

  constructor() { }

  ngOnInit() { }
}
