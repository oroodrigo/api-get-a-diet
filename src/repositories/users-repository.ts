import { User, UserCreateInput } from '../@types'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  checkDaysInOffensive(): Promise<void>
  create(data: UserCreateInput): Promise<User>
}
