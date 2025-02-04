import { Pipe, PipeTransform } from '@angular/core'
import { CategoryService } from '../../modules/category/services/category.service'
import { ICategory } from '../../modules/category/types/category.interface'

@Pipe({
  name: 'getCategoryTitleById',
  standalone: true,
})
export class GetCategoryTitleByIdPipe implements PipeTransform {

  categories: ICategory[] = []

  constructor(
    private readonly categoryService: CategoryService,
  ) {
    this.categoryService.getAllCategories()
    this.categories = this.categoryService.categories
  }

  transform(id: number): string {
    const category = this.categories.filter(category => category.id === id)[0]
    return category?.title
  }

}
