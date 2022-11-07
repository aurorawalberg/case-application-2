import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerEntityModel } from 'src/app/models/customer-entity.model';
import { OrderModel } from 'src/app/models/order.model';
import { ServiceEntityModel } from 'src/app/models/service-entity.model';
import { Store } from '@ngrx/store';
import { DataActions } from 'src/app/store/actions/data.actions';
import { selectOrderInEdit } from 'src/app/store/selectors/data.selectors';
import { Observable, tap } from 'rxjs';
import { OrderEntityModel } from 'src/app/models/order-entity.model';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
})
export class EditOrderComponent implements OnInit {
  @Input() customers: CustomerEntityModel[] = [];

  orderForm = new FormGroup({
    customerName: new FormControl('', [Validators.required]),
    customerPhone: new FormControl('', [Validators.required]),
    customerEmail: new FormControl('', [Validators.required]),
    fromAdress: new FormControl('', [Validators.required]),
    toAdress: new FormControl('', [Validators.required]),
    note: new FormControl(''),
    moveDate: new FormControl('', [Validators.required]),
    packDate: new FormControl(''),
    cleanDate: new FormControl(''),
  });

  nextOrderId = 0;
  nextServiceId = 0;
  nextCustomerId = 0;

  orderInEdit$: Observable<OrderModel | undefined> = this.store
    .select(selectOrderInEdit)
    .pipe(
      tap((orderInEdit) => {
        if (!!orderInEdit) {
          this.orderForm.patchValue({
            customerName: orderInEdit.customer.name,
            customerPhone: orderInEdit.customer.phoneNumber,
            customerEmail: orderInEdit.customer.email,
            fromAdress: orderInEdit.order.fromAdress,
            toAdress: orderInEdit.order.toAdress,
            note: orderInEdit.order.note,
            moveDate: orderInEdit.services.find(
              (s) => s.serviceType == 'Moving'
            )?.date,
            packDate: orderInEdit.services.find(
              (s) => s.serviceType == 'Packing'
            )?.date,
            cleanDate: orderInEdit.services.find(
              (s) => s.serviceType == 'Cleaning'
            )?.date,
          });
        }
      })
    );

  constructor(private store: Store) {}

  ngOnInit(): void {}

  clearOrderInEdit() {
    this.store.dispatch(DataActions.clearOrderInEdit());
  }

  onSubmit(orderInEdit: OrderModel): void {
    const orderRequest = this.processOrderRequestForApi(orderInEdit);

    if (!!orderInEdit) {
      this.store.dispatch(DataActions.updateOrder({ orderRequest }));
    } else {
      this.store.dispatch(DataActions.createOrder({ orderRequest }));
    }
    this.orderForm.reset();
  }

  processOrderRequestForApi(orderInEdit: OrderModel): OrderModel {
    const customer: CustomerEntityModel = {
      id: orderInEdit?.customer?.id
        ? orderInEdit?.customer?.id
        : this.nextCustomerId++,
      name: this.orderForm.value.customerName,
      phoneNumber: this.orderForm.value.customerPhone,
      email: this.orderForm.value.customerEmail,
    };

    const order: OrderEntityModel = {
      date: new Date(),
      id: orderInEdit?.order?.id ? orderInEdit?.order?.id : this.nextOrderId++,
      customerId: this.orderForm.value.customerId,
      fromAdress: this.orderForm.value.fromAdress,
      toAdress: this.orderForm.value.toAdress,
      note: this.orderForm.value.note,
      customer,
    };

    const services: ServiceEntityModel[] = [];
    if (this.orderForm.value.moveDate) {
      services.push({
        id:
          orderInEdit?.services.find((s) => s.serviceType == 'Moving')?.id ??
          this.nextServiceId++,
        serviceType: 'Moving',
        date: this.orderForm.value.moveDate,
        orderId: orderInEdit?.order?.id
          ? orderInEdit.order.id
          : this.nextOrderId,
        customer,
        order,
      });
    }
    if (this.orderForm.value.packDate) {
      services.push({
        id:
          orderInEdit?.services.find((s) => s.serviceType == 'Packing')?.id ??
          this.nextServiceId++,

        serviceType: 'Packing',
        date: this.orderForm.value.packDate,
        orderId: orderInEdit?.order?.id
          ? orderInEdit?.order?.id
          : this.nextOrderId,
        customer,
        order,
      });
    }
    if (this.orderForm.value.cleanDate) {
      services.push({
        id:
          orderInEdit?.services.find((s) => s.serviceType == 'Cleaning')?.id ??
          this.nextServiceId++,
        serviceType: 'Cleaning',
        date: this.orderForm.value.cleanDate,
        orderId: orderInEdit?.order?.id
          ? orderInEdit?.order?.id
          : this.nextOrderId,
        customer,
        order,
      });
    }
    return {
      order,
      customer,
      services,
    };
  }
}
