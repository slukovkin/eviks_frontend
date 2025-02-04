export interface ISetting {
  id?: number,
  firmName: string,
  currencyId: number,
  storeId: number,
  priceTypeOne: number,
  priceTypeTwo: number,
  priceTypeThree: number,
  markup: number,
  employeeId?: number | null,
  telegramBotId?: string,
  telegramKey?: string,
}
