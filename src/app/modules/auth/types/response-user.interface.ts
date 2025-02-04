export interface IResponseToken {
  token: string
}

interface IUser {
  id: number
  email: string,
  roles: IRole[]
}

interface IRole {
  id: number
  value: string
  description: string
}
