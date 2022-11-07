import { OrderEntityModel } from './order-entity.model';

export interface CustomerEntityModel {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  orders?: OrderEntityModel[];
}
