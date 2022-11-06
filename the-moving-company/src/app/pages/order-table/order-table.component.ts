import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CustomerEntityModel } from 'src/app/models/customer-entity.model';
import { OrderModel } from 'src/app/models/order.model';
import { DataActions } from 'src/app/store/actions/data.actions';
import { selectOrderData } from 'src/app/store/selectors/data.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent implements OnInit {
  @Input() customers: CustomerEntityModel[] = [];

  orderData$: Observable<OrderModel[]> = this.store.select(selectOrderData);

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

  constructor(private store: Store) {}

  ngOnInit(): void {}

  updateOrder(order: OrderModel): void {
    this.store.dispatch(DataActions.setOrderInEdit({ order }));
  }

  deleteOrder(orderId: number): void {
    this.store.dispatch(DataActions.deleteOrder({ orderId }));
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orderData$ = this.store
      .select(selectOrderData)
      .pipe(
        map((orders) =>
          orders.filter((o) => o.order.orderId.toString().includes(filterValue))
        )
      );
  }
}
