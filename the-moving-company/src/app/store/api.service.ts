import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CustomerEntityModel } from '../models/customer-entity.model';
import { OrderEntityModel } from '../models/order-entity.model';
import { ServiceEntityModel } from '../models/service-entity.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  getOrders(): Observable<OrderEntityModel[]> {
    return of([
      {
        orderId: 1,
        customerId: 1,
        fromAdress: '123 Main St',
        toAdress: '456 Main St',
        note: 'This is a note',
      },
      {
        orderId: 2,
        customerId: 1,
        fromAdress: '123 Main St',
        toAdress: '456 Main St',
        note: 'This is a note',
      },
    ]);
  }

  getServices(): Observable<ServiceEntityModel[]> {
    return of([
      {
        orderId: 1,
        service: 'Moving',
        date: new Date(),
      },
      {
        orderId: 1,
        service: 'Packing',
        date: new Date(),
      },
    ]);
  }

  getCustomers(): Observable<CustomerEntityModel[]> {
    return of([
      {
        customerId: 1,
        name: 'John Smith',
        email: 'john.smith@gmail.com',
        phoneNumber: '123-456-7890',
      },
    ]);
  }

  deleteOrder(orderId: number) {
    console.log('Order deleted: ' + orderId);
  }

  editOrder(order: OrderEntityModel) {
    console.log('Order edited: ' + order.orderId);
  }
}
