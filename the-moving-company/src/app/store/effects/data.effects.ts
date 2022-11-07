import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { DataActions } from '../actions/data.actions';
import { ApiService } from '../api.service';

@Injectable()
export class DataEffects {
  loadCustomerData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataActions.loadCustomerData),
      switchMap(() =>
        this.dataService.getCustomers().pipe(
          map((data) => {
            return DataActions.customerDataUpdated({ data });
          }),
          catchError((e) =>
            of(
              DataActions.loadDataError({
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
      ofType(DataActions.loadOrderData),
      switchMap(() =>
        this.dataService.getOrders().pipe(
          map((data) => {
            return DataActions.orderDataUpdated({ data });
          }),
          catchError((e) =>
            of(
              DataActions.loadDataError({
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
      ofType(DataActions.loadServiceData),
      switchMap(() =>
        this.dataService.getServices().pipe(
          map((data) => {
            return DataActions.serviceDataUpdated({ data });
          }),
          catchError((e) =>
            of(
              DataActions.loadDataError({
                message: 'Error loading customer data',
                error: e.message,
              })
            )
          )
        )
      )
    )
  );

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataActions.createOrder),
      switchMap((action) =>
        this.dataService.createOrder(action.orderRequest).pipe(
          switchMap(() => [
            DataActions.loadCustomerData(),
            DataActions.loadOrderData(),
            DataActions.loadServiceData(),
          ]),
          catchError((e) =>
            of(
              DataActions.loadDataError({
                message: 'Error creating order',
                error: e.message,
              })
            )
          )
        )
      )
    )
  );

  updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataActions.updateOrder),
      switchMap((action) =>
        this.dataService.updateOrder(action.orderRequest).pipe(
          switchMap(() => [
            DataActions.loadCustomerData(),
            DataActions.loadOrderData(),
            DataActions.loadServiceData(),
          ]),
          catchError((e) =>
            of(
              DataActions.loadDataError({
                message: 'Error updating order',
                error: e.message,
              })
            )
          )
        )
      )
    )
  );

  deleteOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DataActions.deleteOrder),
      switchMap((action) =>
        this.dataService.deleteOrder(action.orderId).pipe(
          switchMap(() => [
            DataActions.loadCustomerData(),
            DataActions.loadOrderData(),
            DataActions.loadServiceData(),
          ]),
          catchError((e) =>
            of(
              DataActions.loadDataError({
                message: 'Error deleting order',
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
