import { Meal } from '@/@types'
import { UsersRepository } from '../repositories/users-repository'

interface MarkMealAsCompletedServiceRequest {
  userId: string
  title: string
}

interface MarkMealAsCompletedServiceResponse {
  mealMarked: Meal
}

export class MarkMealAsCompletedService {
  // eslint-disable-next-line prettier/prettier
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    userId,
    title,
  }: MarkMealAsCompletedServiceRequest): Promise<MarkMealAsCompletedServiceResponse> {
    const mealMarked = await this.usersRepository.markMealAsCompleted({
      userId,
      title,
    })

    return { mealMarked }
  }
}
