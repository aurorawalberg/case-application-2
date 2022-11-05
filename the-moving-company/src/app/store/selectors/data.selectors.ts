import { createSelector } from '@ngrx/store';
import { AppState, DataState } from '../data.store.model';
import { OrderModel } from '../../models/order.model';
import { OrderEntityModel } from 'src/app/models/order-entity.model';
import { ServiceEntityModel } from 'src/app/models/service-entity.model';
import { CustomerEntityModel } from 'src/app/models/customer-entity.model';

export const selectFeature = (state: AppState) => state.data;

export const selectOrdersEntities = createSelector(
  selectFeature,
  (state: DataState) => state.orders
);

export const selectOrders = createSelector(
  selectOrdersEntities,
  (orderEntities: { [key: string]: OrderEntityModel }) =>
    Object.values(orderEntities)
);

export const selectServiceEntities = createSelector(
  selectFeature,
  (state: DataState) => state.services
);

export const selectCustomerEntities = createSelector(
  selectFeature,
  (state: DataState) => state.customers
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
        ...order,
        services: serviceEntities[order.orderId],
        customer: customerEntities[order.customerId],
      };
    });
  }
);
