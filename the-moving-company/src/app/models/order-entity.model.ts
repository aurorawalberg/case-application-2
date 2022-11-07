import { CustomerEntityModel } from './customer-entity.model';
import { ServiceEntityModel } from './service-entity.model';

export interface OrderEntityModel {
  id: number;
  customerId: number;
  fromAdress: string;
  toAdress: string;
  note: string;
  date: Date;
  customer?: CustomerEntityModel;
  services?: ServiceEntityModel[];
}
