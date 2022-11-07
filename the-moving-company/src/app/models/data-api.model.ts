export interface OrderApiModel {
  id: number;
  customerId: number;
  customer: CustomerApiModel;
  fromAdress: string;
  toAdress: string;
  note: string;
  date: Date;
}
export interface CustomerApiModel {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface ServiceApiModel {
  id: number;
  orderId: number;
  serviceType: string;
  date: Date;
}
