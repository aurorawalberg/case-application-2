import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageActions } from '../store/actions/data.actions';
import {
  selectCustomers,
  selectOrderData,
} from '../store/selectors/data.selectors';
import { Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { OrderModel } from '../models/order.model';
import { CustomerEntityModel } from '../models/customer-entity.model';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagesComponent implements OnInit {
  constructor(private store: Store) {}

  orders$: Observable<OrderModel[]> = this.store.select(selectOrderData);
  customers$: Observable<CustomerEntityModel[]> =
    this.store.select(selectCustomers);

  displayedColumns: string[] = [
    'orderId',
    'customerName',
    'customerId',
    'fromAdress',
    'toAdress',
    'services',
    'note',
    'edit',
    'delete',
  ];

  ngOnInit(): void {
    this.store.dispatch(PageActions.loadCustomerData());
    this.store.dispatch(PageActions.loadServiceData());
    this.store.dispatch(PageActions.loadOrderData());
  }

  updateOrder(order: OrderModel): void {
    this.store.dispatch(PageActions.updateOrder({ order }));
  }

  deleteOrder(orderId: number): void {
    this.store.dispatch(PageActions.deleteOrder({ orderId }));
  }

  addOrder(order: OrderModel): void {
    this.store.dispatch(PageActions.createOrder({ order }));
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orders$ = this.store
      .select(selectOrderData)
      .pipe(
        map((orders) =>
          orders.filter((o) => o.order.orderId.toString().includes(filterValue))
        )
      );
  }
}
