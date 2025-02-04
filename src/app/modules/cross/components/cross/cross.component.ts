import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { CrossService } from '../../services/cross.service'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { CrossEditComponent, ICrossCreateData } from '../cross-edit/cross-edit.component'
import { NgIf } from '@angular/common'

export interface ICross {
  id?: number
  group: string
  code: string
  origin: string
}

@Component({
  selector: 'app-cross',
  styleUrl: './cross.component.scss',
  templateUrl: './cross.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatProgressSpinner, CrossEditComponent, NgIf],
})
export class CrossComponent implements AfterViewInit {

  displayedColumns: string[] = ['group', 'code', 'origin']
  dataSource!: MatTableDataSource<ICross>

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  error = ''
  cross_table: ICross[] = []
  showCrossEdit = false

  constructor(
    private crossService: CrossService,
  ) {
  }

  onCrossDataFromForm(value: ICrossCreateData) {
    const cross: ICross = {
      group: '000',
      code: value.code,
      origin: value.origin,
    }
    this.crossService.createNewCross(cross)
    this.showCrossEdit = false
  }

  ngAfterViewInit() {
    this.crossService.getAllCross()
    this.dataSource = new MatTableDataSource(this.crossService.cross_table$())
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  createNewCross() {
    this.showCrossEdit = true
  }
}
