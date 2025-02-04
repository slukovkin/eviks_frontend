import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Constants } from '../../../shared/constants/constants'
import { IEmail } from '../types/email.interface'

@Injectable({
  providedIn: 'root',
})
export class EmailService {

  constructor(private http: HttpClient) {
  }

  sendEmail(email: IEmail) {
    return this.http.post(Constants.BASE_URL + Constants.METHODS.SEND_EMAIL, email)
  }
}
