import { ICountry } from '../../country/types/country.interface'

export interface IManufacturer {
  id?: number
  code: number
  title: string
  countryId: number
  country?: ICountry
}
