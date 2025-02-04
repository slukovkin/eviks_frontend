import { Component, OnDestroy, OnInit } from '@angular/core'
import { CustomerFormComponent } from '../../../customer/components/customer-form/customer-form.component'
import { FaIconComponent } from '@fortawesome/angular-fontawesome'
import { ModalComponent } from '../../../modal/components/modal.component'
import { NgIf } from '@angular/common'
import { StopPropagationDirective } from '../../../../shared/directives/stop-propagation.directive'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ManufacturerService } from '../../services/manufacturer.service'
import { IManufacturer } from '../../types/manufacturer.interface'
import { Router, RouterLink } from '@angular/router'

@Component({
  selector: 'app-manufacturer',
  standalone: true,
  imports: [
    CustomerFormComponent,
    FaIconComponent,
    ModalComponent,
    NgIf,
    StopPropagationDirective,
    RouterLink,
  ],
  templateUrl: './manufacturer.component.html',
  styleUrl: './manufacturer.component.scss',
})
export class ManufacturerComponent implements OnInit, OnDestroy {
  editIcon = faPenToSquare
  deleteIcon = faTrash

  constructor(
    public readonly manufacturerService: ManufacturerService,
    private readonly router: Router,
  ) {
  }

  update(manufacturer: IManufacturer) {
    this.manufacturerService.manufacturer = manufacturer
    this.router.navigate(['new_manufacturer']).then()
  }

  delete(id: number) {
    this.manufacturerService.deleteManufacturerById(id)
  }

  ngOnInit(): void {
    this.manufacturerService.getAllManufacturers()
  }

  ngOnDestroy(): void {
  }
}
