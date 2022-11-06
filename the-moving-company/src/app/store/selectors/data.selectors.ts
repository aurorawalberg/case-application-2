import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DataFeatureKey, DataState } from '../data.store.model';
import { OrderModel } from '../../models/order.model';
import { OrderEntityModel } from 'src/app/models/order-entity.model';
import { ServiceEntityModel } from 'src/app/models/service-entity.model';
import { CustomerEntityModel } from 'src/app/models/customer-entity.model';

export const getDataState = createFeatureSelector<DataState>(DataFeatureKey);

export const selectOrdersEntities = createSelector(
  getDataState,
  (state: DataState) => state.orders
);

export const selectOrders = createSelector(
  selectOrdersEntities,
  (orderEntities: { [key: string]: OrderEntityModel }) =>
    Object.values(orderEntities)
);

export const selectServiceEntities = createSelector(
  getDataState,
  (state: DataState) => state.services
);

export const selectServices = createSelector(
  selectServiceEntities,
  (serviceEntities: { [key: string]: ServiceEntityModel[] }) =>
    Object.values(serviceEntities)
);

export const selectCustomerEntities = createSelector(
  getDataState,
  (state: DataState) => state.customers
);

export const selectCustomers = createSelector(
  selectCustomerEntities,
  (customerEntities: { [key: string]: CustomerEntityModel }) =>
    Object.values(customerEntities)
);

export const selectOrderData = createSelector(
  selectOrders,
  selectServiceEntities,
  selectCustomerEntities,
  (
    orders: OrderEntityModel[],
    serviceEntities: { [key: string]: ServiceEntityModel[] },
    customerEntities: { [key: string]: CustomerEntityModel }
  ): OrderModel[] => {
    return Object.values(orders).map((order) => {
      return {
        order,
        services: serviceEntities[order.orderId],
        customer: customerEntities[order.customerId],
      };
    });
  }
);

export const selectOrderInEdit = createSelector(
  getDataState,
  (state: DataState) => state.orderInEdit
);
