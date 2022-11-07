import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serviceIcon',
})
export class ServiceIconPipe implements PipeTransform {
  transform(serviceType: string): string {
    if (serviceType === 'Moving') {
      return 'local_shipping';
    }
    if (serviceType === 'Packing') {
      return 'inventory_2';
    }
    if (serviceType === 'Cleaning') {
      return 'cleaning_services';
    }
    return 'Unknown';
  }
}
