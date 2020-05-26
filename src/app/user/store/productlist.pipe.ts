import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productlist'
})
export class ProductlistPipe implements PipeTransform {

  transform(product, term: any): any {
    if(term === null) return product;
    if(term === undefined) return product;
    var result = []
    Object.keys(product).forEach(key => {
      if(product[key].category == term) result.push(product[key]);
    })
    return result;
  }

}
