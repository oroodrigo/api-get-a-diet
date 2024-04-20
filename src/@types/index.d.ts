export type User = {
  id: string
  name: string
  email: string
  password_hash: string
  crn: number | null
}

export type UserCreateInput = {
  id?: string | undefined
  name: string
  email: string
  password_hash: string
  crn?: number | null
}
