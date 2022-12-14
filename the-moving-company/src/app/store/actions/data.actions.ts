import { createAction, props } from '@ngrx/store';
import { CustomerEntityModel } from 'src/app/models/customer-entity.model';
import { OrderEntityModel } from 'src/app/models/order-entity.model';
import { OrderModel } from 'src/app/models/order.model';
import { ServiceEntityModel } from 'src/app/models/service-entity.model';

enum ActionType {
  LoadCustomerData = '[Order page] Load Customer Data',
  CustomerDataUpdated = '[Order page] Customer Data Updated',
  LoadOrderData = '[Order page] Order Load Data',
  OrderDataUpdated = '[Order page] Order Data Updated',
  LoadServiceData = '[Order page] Load Service Data',
  ServiceDataUpdated = '[Order page] Service Data Updated',
  RemoveDataError = '[Order page] Remove Data Error',
  LoadDataError = '[Order page] Error Loading Data',
  UpdateOrder = '[Order page] Update Order',
  CreateOrder = '[Order page] Create Order',
  DeleteOrder = '[Order page] Delete Order',
  AddOrder = '[Order page] Add Order',
  SetOrderInEdit = '[Order page] Set Order In Edit',
  ClearOrderInEdit = '[Order page] Clear Order In Edit',
}

export const DataActions = {
  loadDataError: createAction(
    ActionType.LoadDataError,
    props<{ message: string; error?: string }>()
  ),
  removeDataError: createAction(ActionType.RemoveDataError),
  loadCustomerData: createAction(ActionType.LoadCustomerData),
  customerDataUpdated: createAction(
    ActionType.CustomerDataUpdated,
    props<{ data: CustomerEntityModel[] }>()
  ),
  loadOrderData: createAction(ActionType.LoadOrderData),
  orderDataUpdated: createAction(
    ActionType.OrderDataUpdated,
    props<{ data: OrderEntityModel[] }>()
  ),
  loadServiceData: createAction(ActionType.LoadServiceData),
  serviceDataUpdated: createAction(
    ActionType.ServiceDataUpdated,
    props<{ data: ServiceEntityModel[] }>()
  ),
  updateOrder: createAction(
    ActionType.UpdateOrder,
    props<{ orderRequest: OrderModel }>()
  ),
  createOrder: createAction(
    ActionType.CreateOrder,
    props<{ orderRequest: OrderModel }>()
  ),
  deleteOrder: createAction(
    ActionType.DeleteOrder,
    props<{ orderId: number }>()
  ),
  setOrderInEdit: createAction(
    ActionType.SetOrderInEdit,
    props<{ order: OrderModel }>()
  ),
  clearOrderInEdit: createAction(ActionType.ClearOrderInEdit),
};
