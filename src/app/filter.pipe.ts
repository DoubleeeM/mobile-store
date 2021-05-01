import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterPipe' })
export class FilterPipe implements PipeTransform {

  transform(list: any[], filterText: string): any {
    return list ? list.filter(item => item.brand.search(new RegExp(filterText, 'i')) > -1) : [];
  }
}
