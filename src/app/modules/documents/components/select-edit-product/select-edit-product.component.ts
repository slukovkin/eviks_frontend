import { Component } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { DocumentService } from '../../services/document.service'
import { IProductSelect } from '../../types/product-in-store.interface'
import { EurToUahPipe } from '../../../../shared/pipes/eur-to-uah.pipe'
import { IProduct } from '../../../product/types/product.interfaces'
import { Location } from '@angular/common'

@Component({
  selector: 'app-select-edit-product',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    StopPropagationDirective,
    EurToUahPipe,
  ],
  templateUrl: './select-edit-product.component.html',
  styleUrl: './select-edit-product.component.scss',
})
export class SelectEditProductComponent {
  selectForm: FormGroup
  product: IProduct | null

  constructor(
    public readonly documentService: DocumentService,
    private _location: Location) {
    this.product = this.documentService.selectProduct$()
    this.selectForm = new FormGroup({
      selectQty: new FormControl(null, [Validators.required]),
      selectPriceIn: new FormControl(this.documentService.selectProduct$()?.stores![0].ProductStore.priceIn, [Validators.required]),
      selectPriceOut: new FormControl(this.documentService.selectProduct$()?.stores![0].ProductStore.priceOut, [Validators.required]),
    })
  }


  onSubmit() {
    if (this.selectForm.valid) {
      const product: IProductSelect = {
        productId: this.documentService.selectProduct$()?.id!,
        code: this.documentService.selectProduct$()?.code!,
        article: this.documentService.selectProduct$()?.article!,
        title: this.documentService.selectProduct$()?.title!,
        brandId: this.documentService.selectProduct$()?.brandId!,
        categoryId: this.documentService.selectProduct$()?.categoryId!,
        storeId: 1,
        qty: Number(this.selectForm.value.selectQty),
        priceIn: Number(this.selectForm.value.selectPriceIn),
        priceOut: Number(this.selectForm.value.selectPriceOut),
      }
      this.documentService.addSelectProductToArray(product)
      this._location.back()
    }
  }

  back() {
    this._location.back()
  }
}
