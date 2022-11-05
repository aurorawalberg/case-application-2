import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageActions } from '../store/actions/data.actions';
import { selectOrderData } from '../store/selectors/data.selectors';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { OrderModel } from '../models/order.model';
import { ApiService } from '../store/api.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagesComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  orders$: Observable<OrderModel[]> = combineLatest([
    this.apiService.getOrders(),
    this.apiService.getServices(),
    this.apiService.getCustomers(),
  ]).pipe(
    map(([orders, services, customers]) => {
      return orders.map((order) => {
        return {
          ...order,
          services: services.filter(
            (service) => service.orderId === order.orderId
          ),
          // customer: customers.find(
          //   (customer) => customer.customerId === order.customerId
          // ),
          customer: customers[0],
        };
      });
    })
  );

  ngOnInit(): void {
    // this.orders$ = this.store.select(selectOrderData);
  }

  updateOrder(order: OrderModel): void {
    // this.store.dispatch(PageActions.updateOrder({ order }));
  }

  deleteOrder(orderId: number): void {
    // this.store.dispatch(PageActions.deleteOrder({ orderId }));
  }

  addOrder(order: OrderModel): void {
    // this.store.dispatch(PageActions.addOrder({ order }));
  }
}
