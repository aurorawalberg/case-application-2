import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataActions } from '../store/actions/data.actions';
import {
  selectCustomers,
  selectOrderInEdit,
} from '../store/selectors/data.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderModel } from '../models/order.model';
import { CustomerEntityModel } from '../models/customer-entity.model';
import { OrderEntityModel } from '../models/order-entity.model';

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

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(DataActions.loadCustomerData());
    this.store.dispatch(DataActions.loadServiceData());
    this.store.dispatch(DataActions.loadOrderData());
  }
}
