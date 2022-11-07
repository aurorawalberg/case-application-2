import { CustomerEntityModel } from './customer-entity.model';
import { CustomerApiModel, OrderApiModel } from './data-api.model';
import { OrderEntityModel } from './order-entity.model';

export interface ServiceEntityModel {
  id: number;
  orderId: number;
  serviceType: string;
  date: Date;
  order?: OrderEntityModel | OrderApiModel;
  customer?: CustomerEntityModel | CustomerApiModel;
}
