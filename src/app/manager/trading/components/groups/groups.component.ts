import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getGroupsFromSection } from '@app/core/reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TradingState } from '@trading/reducers';
import { GROUPS } from '@app/shared/enums/trading.enum';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-groups',
  template: `
    <div class="form-group">
      <label for="group" class="small font-weight-bold">GROUPS</label>
      <select
        id="group"
        class="form-control form-control-sm"
        [value]="this.type === GROUPS ? this.id : null"
        (change)="onChange($event.target.value)">
        <option *ngFor="let group of groups" [value]="group.id">{{ group.name }}</option>
      </select>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent implements OnInit {
  GROUPS = GROUPS;
  @Input()
  id: string;
  @Input()
  type: string;
  @Input()
  section: any;
  @Output()
  select: EventEmitter<{ currentId: string, currentType: string }> = new EventEmitter();
  private readonly notifier: NotifierService;

  constructor(
    private router: Router,
    private store: Store<TradingState>,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

  get groups() {
    return getGroupsFromSection(this.section);
  }

  ngOnInit() {
  }

  onChange(groupId) {
    const tab = this.route.snapshot.paramMap.get('tab');
    const routerPromise = this.router.navigate([`/trading/${GROUPS}/${groupId}/${tab}`]);

    routerPromise.then(() => {
      this.select.emit({currentId: groupId, currentType: GROUPS});
    }, error1 => {
      this.notifierService.notify('error', `Please try again: ${error1}`);
    });
  }
}
