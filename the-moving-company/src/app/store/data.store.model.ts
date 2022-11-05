import { CustomerEntityModel } from '../models/customer-entity.model';
import { OrderEntityModel } from '../models/order-entity.model';
import { ServiceEntityModel } from '../models/service-entity.model';

export const DataFeatureKey = 'data';

export interface DataState {
  orders: {
    [key: number]: OrderEntityModel;
  };
  customers: {
    [key: number]: CustomerEntityModel;
  };
  services: {
    [key: number]: ServiceEntityModel[];
  };
  error: string[];
}

export interface AppState {
  data: DataState;
}
