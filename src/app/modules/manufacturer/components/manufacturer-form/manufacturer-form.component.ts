import { Component, OnInit } from '@angular/core'
import { ManufacturerService } from '../../services/manufacturer.service'
import { IManufacturer } from '../../types/manufacturer.interface'
import { JsonPipe, Location } from '@angular/common'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatOption, MatSelect } from '@angular/material/select'
import { CountryService } from '../../../country/services/country.service'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'

@Component({
  selector: 'app-manufacturer-form',
  standalone: true,
  imports: [
    JsonPipe,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    StopPropagationDirective,
    FormsModule,
  ],
  templateUrl: './manufacturer-form.component.html',
  styleUrl: './manufacturer-form.component.scss',
})
export class ManufacturerFormComponent implements OnInit {

  manufacturerForm!: FormGroup
  manufacturer?: IManufacturer

  constructor(
    public readonly manufacturerService: ManufacturerService,
    public readonly countryService: CountryService,
    private readonly _location: Location,
  ) {
  }

  ngOnInit(): void {
    this.countryService.getAllCountries()
    this.manufacturer = this.manufacturerService.manufacturer
    this.manufacturerForm = new FormGroup({
      code: new FormControl(this.manufacturer?.code,
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
      title: new FormControl(this.manufacturer?.title, Validators.required),
      countryId: new FormControl(this.manufacturer?.countryId, Validators.required),
    })
  }

  onSubmit() {
    if (this.manufacturerForm.valid) {
      const manufacturer: IManufacturer = {
        id: this.manufacturer?.id,
        code: Number(this.manufacturerForm.controls['code'].value),
        title: this.manufacturerForm.controls['title'].value.toUpperCase(),
        countryId: Number(this.manufacturerForm.controls['countryId'].value),
      }
      if (manufacturer.id) {
        this.manufacturerService.updateManufacturerById(manufacturer.id, manufacturer)
        this.back()
      } else {
        this.manufacturerService.createManufacturer(manufacturer)
        this.back()
      }
    }
  }

  back() {
    this.manufacturerService.manufacturer = undefined
    this.manufacturerForm.reset()
    this._location.back()
  }
}
