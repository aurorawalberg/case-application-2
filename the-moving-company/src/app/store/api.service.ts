import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerEntityModel } from '../models/customer-entity.model';
import { OrderEntityModel } from '../models/order-entity.model';
import { OrderModel } from '../models/order.model';
import { ServiceEntityModel } from '../models/service-entity.model';

export const baseAPIUrl = 'https://localhost:7127/api';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getOrders(): Observable<OrderEntityModel[]> {
    return this.httpClient.get(`${baseAPIUrl}/orders`) as Observable<
      OrderEntityModel[]
    >;
  }

  getServices(): Observable<ServiceEntityModel[]> {
    return this.httpClient.get(`${baseAPIUrl}/services`) as Observable<
      ServiceEntityModel[]
    >;
  }

  getCustomers(): Observable<CustomerEntityModel[]> {
    return this.httpClient.get(`${baseAPIUrl}/customers`) as Observable<
      CustomerEntityModel[]
    >;
  }

  deleteOrder(orderId: number) {
    return this.httpClient.delete(`${baseAPIUrl}/orders/${orderId}`);
  }

  updateOrder(orderRequest: OrderModel) {
    return this.httpClient.post(
      `${baseAPIUrl}/orders/${orderRequest.order.id}`,
      orderRequest
    );
  }

  createOrder(orderRequest: OrderModel) {
    return this.httpClient.post(`${baseAPIUrl}/orders`, orderRequest);
  }
}
