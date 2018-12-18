import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getTicksFromSection } from '@app/core/reducers';

@Component({
  selector: 'app-ticks',
  template: `
    <h1>Ticks</h1>
    <app-tick
      *ngFor="let tick of ticks"
      [tick]="tick"
    ></app-tick>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicksComponent implements OnInit {

  @Input()
  section: any;

  constructor() {
  }

  ngOnInit() {
    console.log(this);
  }

  get ticks() {
    return getTicksFromSection(this.section);
  }

}
