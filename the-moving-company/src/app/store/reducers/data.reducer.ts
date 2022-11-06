import { createReducer, on } from '@ngrx/store';
import { CustomerEntityModel } from 'src/app/models/customer-entity.model';
import { OrderEntityModel } from 'src/app/models/order-entity.model';
import { ServiceEntityModel } from 'src/app/models/service-entity.model';
import { DataActions } from '../actions/data.actions';
import { DataState } from '../data.store.model';

export const initialState: DataState = {
  orders: {},
  customers: {},
  services: {},
  orderInEdit: undefined,
  error: [],
};

const _dataReducer = createReducer(
  initialState,
  on(DataActions.orderDataUpdated, (state, { data }) => {
    return {
      ...state,
      orders: formatOrderDataToEntity(data),
    };
  }),
  on(DataActions.serviceDataUpdated, (state, { data }) => {
    return {
      ...state,
      services: formatServiceDataToEntity(data),
    };
  }),
  on(DataActions.customerDataUpdated, (state, { data }) => {
    return {
      ...state,
      customers: formatCustomerDataToEntity(data),
    };
  }),
  on(DataActions.setOrderInEdit, (state, { order }) => {
    return {
      ...state,
      orderInEdit: order,
    };
  }),
  on(DataActions.updateOrder, (state) => {
    return {
      ...state,
      orderInEdit: undefined,
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
