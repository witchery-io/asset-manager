import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromGroup from '@settings/actions/group.actions';
import { GroupService } from '@app/core/services';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class GroupEffects {

  @Effect()
  loadGroup$ = this.actions$.pipe(
    ofType<fromGroup.LoadGroup>(fromGroup.LOAD_GROUP),
    map(settings => settings.payload),
    switchMap((id: any) => {
      return this.groupService.getGroup(id).pipe(
        map(response => {
          return new fromGroup.GroupLoaded({ group: response });
        }),
        catchError(error => of(new fromGroup.GroupNotLoaded({ error: error.message || error }))),
      );
    }),
  );

  constructor(
    private actions$: Actions<fromGroup.Actions>,
    private groupService: GroupService,
  ) { }
}
