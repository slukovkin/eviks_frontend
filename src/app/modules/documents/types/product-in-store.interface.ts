export interface IProductInStore {
  productId: number
  storeId: number
  qty: number
  priceIn: number
  priceOut: number
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
