import { ICustomer } from '../../customer/types/customer.interface'

export interface IInvoice {
  id?: number;
  doc_number: string
  type: string
  customerId: number
  date: string
  orderId?: number
  amount: number
  status: boolean
  customer?: ICustomer
  products?: IProductSelect[]
}

export interface IProductSelect {
  productId: number
  code: number
  article: string
  title: string
  brandId: number
  categoryId: number
  storeId: number
  qty: number
  priceIn: number
  priceOut: number
}
