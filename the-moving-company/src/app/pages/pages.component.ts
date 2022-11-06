import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageActions } from '../store/actions/data.actions';
import {
  selectCustomers,
  selectOrderData,
} from '../store/selectors/data.selectors';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { OrderModel } from '../models/order.model';
import { ApiService } from '../store/api.service';
import { CustomerEntityModel } from '../models/customer-entity.model';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagesComponent implements OnInit {
  constructor(private apiService: ApiService, private store: Store) {}

  customers$: Observable<CustomerEntityModel[]> =
    this.apiService.getCustomers();

  orders$: Observable<OrderModel[]> = combineLatest([
    this.apiService.getOrders(),
    this.apiService.getServices(),
    this.customers$,
  ]).pipe(
    map(([orders, services, customers]) => {
      return orders.map((order) => {
        const customer = customers.find(
          (customer) => customer.customerId === order.customerId
        );
        return {
          order,
          services: services.filter(
            (service) => service.orderId === order.orderId
          ),
          customer: customer
            ? customer
            : { customerId: 0, name: '', phoneNumber: '', email: '' },
        };
      });
    })
  );

  // orders$: Observable<OrderModel[]> = this.store.select(selectOrderData);
  // customers$: Observable<CustomerEntityModel[]> =
  //   this.store.select(selectCustomers);

  ngOnInit(): void {
    this.store.dispatch(PageActions.loadCustomerData());
    this.store.dispatch(PageActions.loadServiceData());
    this.store.dispatch(PageActions.loadOrderData());
  }

  updateOrder(order: OrderModel): void {
    // this.apiService.updateOrder(order);
    this.store.dispatch(PageActions.updateOrder({ order }));
  }

  deleteOrder(orderId: number): void {
    // this.apiService.deleteOrder(orderId);
    this.store.dispatch(PageActions.deleteOrder({ orderId }));
  }

  addOrder(order: OrderModel): void {
    // this.apiService.createOrder(order);
    this.store.dispatch(PageActions.createOrder({ order }));
  }
}
