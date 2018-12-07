import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromGroup from '@app/core/actions/group.actions';
import { GroupService } from '@app/core/services';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class GroupEffects {

  @Effect()
  loadGroups$ = this.actions$.pipe(
      ofType<fromGroup.LoadGroups>(fromGroup.LOAD_GROUPS),
      switchMap(() => {
        return this.groupService.getGroups()
          .pipe(
            map(response => {
              return new fromGroup.GroupsLoaded({ groups: response });
            }),
            catchError(error => of(new fromGroup.GroupsNotLoaded({ error: error.message || error }))),
        );
      }),
    );

  constructor(
    private actions$: Actions<fromGroup.Actions>,
    private groupService: GroupService,
  ) { }
}
