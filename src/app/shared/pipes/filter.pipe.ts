import { Pipe, PipeTransform } from '@angular/core'
import { IProduct } from '../../modules/product/types/product.interfaces'

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {

  transform(products: IProduct[], param: string): IProduct[] {
    if (param === '') return products
    return products.filter(product =>
      product.article.toLowerCase().includes(param.toLowerCase())
      || product.title.toLowerCase().includes(param.toLowerCase())
      || product.code.toString().toLowerCase().includes(param.toLowerCase()),
    )
  }
}
