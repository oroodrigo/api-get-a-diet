import { randomUUID } from 'node:crypto'
import { User, UserCreateInput } from '../../@types'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  private items: User[] = []

  async checkDaysInOffensive(): Promise<void> {
    this.items.forEach((user) => {
      const isAllMealsCompleted = user.diet?.meals.every(
        (meal) => meal.completed,
      )

      if (!isAllMealsCompleted) {
        user.days_in_offensive = 0
      } else {
        user.days_in_offensive += 1
      }

      user.diet?.meals.forEach((meal) => (meal.completed = null))
    })
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      image_url: null,
      password_hash: data.password_hash,
      crn: data.crn ?? null,
      diet: null,
      days_in_offensive: 0,
    }

    this.items.push(user)

    return user
  }
}
