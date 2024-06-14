import {
  MarkMealAsCompletedInput,
  Meal,
  User,
  UserCreateInput,
} from '../@types'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  checkDaysInOffensive(): Promise<void>
  markMealAsCompleted(data: MarkMealAsCompletedInput): Promise<Meal>
  create(data: UserCreateInput): Promise<User>
}
