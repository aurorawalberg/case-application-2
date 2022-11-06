import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ApiActions, PageActions } from '../actions/data.actions';
import { ApiService } from '../api.service';

@Injectable()
export class DataEffects {
  loadCustomerData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PageActions.loadCustomerData),
      switchMap(() =>
        this.dataService.getCustomers().pipe(
          map((data) => {
            return PageActions.customerDataUpdated({ data });
          }),
          catchError((e) =>
            of(
              ApiActions.loadDataError({
                message: 'Error loading customer data',
                error: e.message,
              })
            )
          )
        )
      )
    )
  );

  loadOrderData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PageActions.loadOrderData),
      switchMap(() =>
        this.dataService.getOrders().pipe(
          map((data) => {
            return PageActions.orderDataUpdated({ data });
          }),
          catchError((e) =>
            of(
              ApiActions.loadDataError({
                message: 'Error loading customer data',
                error: e.message,
              })
            )
          )
        )
      )
    )
  );
  loadServiceData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PageActions.loadServiceData),
      switchMap(() =>
        this.dataService.getServices().pipe(
          map((data) => {
            return PageActions.serviceDataUpdated({ data });
          }),
          catchError((e) =>
            of(
              ApiActions.loadDataError({
                message: 'Error loading customer data',
                error: e.message,
              })
            )
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private dataService: ApiService) {}
}
