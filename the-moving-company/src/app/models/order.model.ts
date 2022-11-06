import { CustomerEntityModel } from './customer-entity.model';
import { OrderEntityModel } from './order-entity.model';
import { ServiceEntityModel } from './service-entity.model';

export interface OrderModel {
  order: OrderEntityModel;
  customer: CustomerEntityModel;
  services: ServiceEntityModel[];
}
