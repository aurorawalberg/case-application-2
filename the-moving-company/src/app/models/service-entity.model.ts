export interface ServiceEntityModel {
  orderId: number;
  service: 'Packing' | 'Moving' | 'Cleaning';
  date: Date;
}
