import { DietsRepository } from '@/repositories/diets-repository'
import { User } from '../@types'
import { UsersRepository } from '../repositories/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateUserDietRequest {
  dietId: string
  userId: string
}

interface UpdateUserDietResponse {
  userWithNewDiet: User
}

export class UpdateUserDietService {
  // eslint-disable-next-line prettier/prettier
  constructor(private usersRepository: UsersRepository, private dietsRepository: DietsRepository ) { }

  async execute({
    dietId,
    userId,
  }: UpdateUserDietRequest): Promise<UpdateUserDietResponse> {
    const diet = await this.dietsRepository.findById(dietId)

    if (!diet) {
      throw new ResourceNotFoundError()
    }

    const userWithNewDiet = await this.usersRepository.setUserDiet({
      userId,
      diet,
    })

    if (!userWithNewDiet) {
      throw new ResourceNotFoundError()
    }

    return { userWithNewDiet }
  }
}
