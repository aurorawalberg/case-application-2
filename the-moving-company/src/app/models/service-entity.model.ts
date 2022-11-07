import { CustomerEntityModel } from './customer-entity.model';
import { OrderEntityModel } from './order-entity.model';

export interface ServiceEntityModel {
  id: number;
  orderId: number;
  serviceType: string;
  date: Date;
  order?: OrderEntityModel;
  customer?: CustomerEntityModel;
}
