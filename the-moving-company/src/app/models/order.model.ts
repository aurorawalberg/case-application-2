import { CustomerEntityModel } from './customer-entity.model';
import { ServiceEntityModel } from './service-entity.model';

export interface OrderModel {
  orderId: number;
  fromAdress: string;
  toAdress: string;
  note: string;
  customer: CustomerEntityModel;
  services: ServiceEntityModel[];
}
