import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerEntityModel } from 'src/app/models/customer-entity.model';
import { OrderModel } from 'src/app/models/order.model';
import { ServiceEntityModel } from 'src/app/models/service-entity.model';
import { Store } from '@ngrx/store';
import { DataActions } from 'src/app/store/actions/data.actions';
import { selectOrderInEdit } from 'src/app/store/selectors/data.selectors';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
})
export class EditOrderComponent implements OnInit {
  @Output() submit = new EventEmitter<OrderModel>();
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

  //TODOAURORA: fikse id-er når ikke ny, handle i database
  onSubmit(orderInEdit: boolean): void {
    const services: ServiceEntityModel[] = [];
    if (this.orderForm.value.moveDate) {
      services.push({
        serviceType: 'Moving',
        date: this.orderForm.value.moveDate,
        orderId: 0,
      });
    }
    if (this.orderForm.value.packDate) {
      services.push({
        serviceType: 'Packing',
        date: this.orderForm.value.packDate,
        orderId: 0,
      });
    }
    if (this.orderForm.value.cleanDate) {
      services.push({
        serviceType: 'Cleaning',
        date: this.orderForm.value.cleanDate,
        orderId: 0,
      });
    }
    const order: OrderModel = {
      order: {
        date: new Date(),
        id: 0,
        customerId: this.orderForm.value.customerId,
        fromAdress: this.orderForm.value.fromAdress,
        toAdress: this.orderForm.value.toAdress,
        note: this.orderForm.value.note,
      },
      customer: {
        id: this.orderForm.value.customerId,
        name: this.orderForm.value.customerName,
        phoneNumber: this.orderForm.value.customerPhone,
        email: this.orderForm.value.customerEmail,
      },
      services,
    };
    if (orderInEdit) {
      this.store.dispatch(DataActions.updateOrder({ order }));
    } else {
      this.store.dispatch(DataActions.createOrder({ order }));
    }
  }
}
