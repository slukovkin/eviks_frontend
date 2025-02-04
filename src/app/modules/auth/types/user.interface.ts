export interface UserInterface {
  email: string;
  password: string;
}

export interface ITokenResponse {
  id: number
  email: string
  roles: IRole[]
}

interface IRole {
  id: number
  value: string
  description: string
}
