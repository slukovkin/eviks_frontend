import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Constants } from '../../../shared/constants/constants'

@Injectable({
  providedIn: 'root',
})
export class UploadService {

  constructor(private readonly http: HttpClient) {
  }

  uploadCrossTableToDb(file: File) {
    this.http.post(Constants.BASE_URL + Constants.METHODS.UPLOAD_CROSS_TABLE, file).subscribe()
  }
}
