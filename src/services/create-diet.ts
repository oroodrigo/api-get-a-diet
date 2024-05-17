import { UsersRepository } from '@/repositories/users-repository'
import { Diet, Meal } from '../@types'
import { UnauthorizedError } from './errors/unauthorized-error'
import { DietsRepository } from '@/repositories/diets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateDietServiceRequest {
  title: string
  meals: Meal[]
  author_id: string
}

interface CreateDietServiceResponse {
  diet: Diet
}

export class CreateDietService {
  // eslint-disable-next-line prettier/prettier
  constructor(private dietsrepository: DietsRepository, private userRepository: UsersRepository) { }

  async execute({
    title,
    meals,
    author_id,
  }: CreateDietServiceRequest): Promise<CreateDietServiceResponse> {
    const user = await this.userRepository.findById(author_id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const userHasCrn = user.crn

    if (!userHasCrn) {
      throw new UnauthorizedError()
    }

    const diet = await this.dietsrepository.create({
      title,
      meals,
      author_id: user.id,
      author_name: user.name,
    })

    return { diet }
  }
}
