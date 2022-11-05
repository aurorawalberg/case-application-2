import { createReducer, on } from '@ngrx/store';
import { CustomerEntityModel } from 'src/app/models/customer-entity.model';
import { OrderEntityModel } from 'src/app/models/order-entity.model';
import { ServiceEntityModel } from 'src/app/models/service-entity.model';
import { PageActions } from '../actions/data.actions';
import { DataState } from '../data.store.model';

export const initialState: DataState = {
  orders: {},
  customers: {},
  services: {},
  error: [],
};

const _dataReducer = createReducer(
  initialState,
  on(PageActions.orderDataUpdated, (state, { data }) => {
    return {
      ...state,
      orders: formatOrderDataToEntity(data),
    };
  }),
  on(PageActions.serviceDataUpdated, (state, { data }) => {
    return {
      ...state,
      services: formatServiceDataToEntity(data),
    };
  }),
  on(PageActions.customerDataUpdated, (state, { data }) => {
    return {
      ...state,
      customers: formatCustomerDataToEntity(data),
    };
  })
);

export function dataReducer(state: DataState, action: any) {
  return _dataReducer(state, action);
}

function formatOrderDataToEntity(data: OrderEntityModel[]) {
  return data.reduce((acc: { [key: number]: OrderEntityModel }, cur) => {
    acc[cur.orderId] = cur;
    return acc;
  }, {});
}

function formatCustomerDataToEntity(data: CustomerEntityModel[]) {
  return data.reduce((acc: { [key: number]: CustomerEntityModel }, cur) => {
    acc[cur.customerId] = cur;
    return acc;
  }, {});
}

function formatServiceDataToEntity(data: ServiceEntityModel[]) {
  return data.reduce((acc: { [key: number]: ServiceEntityModel[] }, cur) => {
    if (acc[cur.orderId]) {
      acc[cur.orderId].push(cur);
    } else {
      acc[cur.orderId] = [cur];
    }
    return acc;
  }, {});
}
