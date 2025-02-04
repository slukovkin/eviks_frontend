import { Component, OnInit, signal } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Location, NgClass, NgIf } from '@angular/common'
import { RouterLink } from '@angular/router'
import { ProductService } from '../../service/product.service'
import { IProductInStockAttributes, ProductCreationAttributes } from '../../types/product.interfaces'
import { ModalService } from '../../../modal/service/modal.service'
import { firstCharToUpperCase } from '../../../../shared/utils/transformString'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons/faCloudUpload'
import { HttpClient } from '@angular/common/http'
import { CurrencyService } from '../../../currency/components/services/currency.service'
import { SettingService } from '../../../settings/service/setting.service'
import { ICurrency } from '../../../currency/types/currency.interface'
import { MatOption } from '@angular/material/core'
import { MatError, MatFormField, MatLabel, MatSelect } from '@angular/material/select'
import { CategoryService } from '../../../category/services/category.service'
import { MatInput } from '@angular/material/input'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { ManufacturerService } from '../../../manufacturer/services/manufacturer.service'
import { IManufacturer } from '../../../manufacturer/types/manufacturer.interface'


@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    FaIconComponent,
    MatOption,
    MatSelect,
    NgClass,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    StopPropagationDirective,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {

  product?: IProductInStockAttributes
  manufacturers: IManufacturer[] = []
  productForm!: FormGroup
  previewImage = signal<string>('')
  pathFile: any
  currentCurrency: ICurrency

  uploadIcon = faCloudUpload

  constructor(
    private readonly http: HttpClient,
    public readonly modalService: ModalService,
    public readonly productService: ProductService,
    private readonly currencyService: CurrencyService,
    private readonly settingService: SettingService,
    public readonly categoryService: CategoryService,
    public readonly manufacturerService: ManufacturerService,
    private readonly _location: Location,
  ) {
    this.categoryService.getAllCategories()
    this.currencyService.getCurrencyById(this.settingService.setting!.currencyId)
    this.currentCurrency = this.currencyService.currencyDefault!
  }


  // TODO #5: Переделать сохранение изображения. Сохранение должно быть при сохранении номенклатуры
  fileHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0]

    if (!file || !file.type.match('image')) return
    const reader = new FileReader()
    reader.onload = (event) => {
      // @ts-ignore
      const formData = new FormData()
      formData.append('file', file)
      this.http.post('http://localhost:5000/files', formData)
        .subscribe((path) => {
          this.pathFile = path
        })
      this.previewImage.set(event.target?.result?.toString() ?? '')
    }
    reader.readAsDataURL(file)
  }

  submit() {
    if (this.productForm.valid) {
      const newProduct: ProductCreationAttributes = {
        code: Number(this.productForm.controls['code'].value),
        article: this.productForm.controls['article'].value.toUpperCase(),
        title: firstCharToUpperCase(this.productForm.controls['title'].value),
        brandId: Number(this.productForm.controls['brand'].value),
        categoryId: Number(this.productForm.controls['category'].value),
        price: 0,
        qty: 0,
        imageUrl: this.pathFile,
      }
      if (this.product?.id) {
        this.productService.update(
          {
            ...newProduct,
            id: this.product.id,
            cross: this.product.cross,
            createdAt: this.product.createdAt,
            updatedAt: this.product.updatedAt,
          },
        )
        this.back()
      } else {
        this.productService.create(newProduct)
        this.back()
      }
    }
  }

  back() {
    this.productService.product = undefined
    this.productForm.reset()
    this._location.back()
  }

  ngOnInit(): void {
    this.manufacturerService.getAllManufacturers()
    this.product = this.productService.product
    this.productForm = new FormGroup({
      code: new FormControl(this.product?.code,
        [Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
        ]),
      article: new FormControl(this.product?.article, [Validators.required]),
      title: new FormControl(this.product?.title, [Validators.required]),
      brand: new FormControl(this.product?.manufacturer?.id, [Validators.required]),
      category: new FormControl(this.product?.categoryId, [Validators.required]),
      price: new FormControl(this.product?.price ?? 0),
      qty: new FormControl(this.product?.qty ?? 0),
      picture: new FormControl(''),
    })
  }
}
