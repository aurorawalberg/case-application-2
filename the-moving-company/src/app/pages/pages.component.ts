import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataActions } from '../store/actions/data.actions';
import {
  selectActiveOrders,
  selectCustomers,
  selectError,
  selectOrderInEdit,
} from '../store/selectors/data.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderModel } from '../models/order.model';
import { CustomerEntityModel } from '../models/customer-entity.model';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagesComponent implements OnInit {
  customers$: Observable<CustomerEntityModel[]> =
    this.store.select(selectCustomers);

  orderInEdit$: Observable<OrderModel | undefined> =
    this.store.select(selectOrderInEdit);

  activeOrders$: Observable<number> = this.store.select(selectActiveOrders);
  error$: Observable<string[]> = this.store.select(selectError);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(DataActions.loadOrderData());
    this.store.dispatch(DataActions.loadCustomerData());
    this.store.dispatch(DataActions.loadServiceData());
  }

  refreshData() {
    this.store.dispatch(DataActions.loadOrderData());
    this.store.dispatch(DataActions.loadCustomerData());
    this.store.dispatch(DataActions.loadServiceData());
  }

  removeError() {
    this.store.dispatch(DataActions.removeDataError());
  }
}
