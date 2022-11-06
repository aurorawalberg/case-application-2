import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomerEntityModel } from 'src/app/models/customer-entity.model';
import { OrderModel } from 'src/app/models/order.model';
import { ServiceEntityModel } from 'src/app/models/service-entity.model';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
})
export class EditOrderComponent implements OnInit {
  @Output() submit = new EventEmitter<OrderModel>();
  @Input() customers: CustomerEntityModel[] = [];

  orderForm = new FormGroup({
    customer: new FormControl(''),
    fromAdress: new FormControl(''),
    toAdress: new FormControl(''),
    note: new FormControl(''),
    moveDate: new FormControl(''),
    packDate: new FormControl(''),
    cleanDate: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    const services: ServiceEntityModel[] = [];
    const customer: CustomerEntityModel = this.customers.find(
      (customer) => customer.customerId === this.orderForm.value.customer
    )!;
    if (this.orderForm.value.moveDate) {
      services.push({
        serviceType: 0,
        date: this.orderForm.value.moveDate,
        orderId: 0,
      });
    }
    if (this.orderForm.value.packDate) {
      services.push({
        serviceType: 1,
        date: this.orderForm.value.packDate,
        orderId: 0,
      });
    }
    if (this.orderForm.value.cleanDate) {
      services.push({
        serviceType: 2,
        date: this.orderForm.value.cleanDate,
        orderId: 0,
      });
    }
    const order: OrderModel = {
      order: {
        orderId: 0,
        customerId: customer.customerId,
        fromAdress: this.orderForm.value.fromAdress,
        toAdress: this.orderForm.value.toAdress,
        note: this.orderForm.value.note,
      },
      customer,
      services,
    };
    console.log(order);
  }
}
