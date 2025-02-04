import { HttpStatusCode } from '@angular/common/http'

export interface ResponseInterface {
  status: HttpStatusCode,
  message: string,
}

export interface IUserResponse {
  'email': string,
  'id': number,
  'roles': [
    {
      'id': number,
      'value': string,
      'description': string,
    }
  ],
  'iat': number,
  'exp': number
}
