import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serviceType',
})
export class ServiceTypePipe implements PipeTransform {
  transform(serviceType: number): string {
    if (serviceType === 0) {
      return 'Moving';
    }
    if (serviceType === 1) {
      return 'Packing';
    }
    if (serviceType === 2) {
      return 'Cleaning';
    }
    return 'Unknown';
  }
}
