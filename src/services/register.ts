import { hash } from 'bcryptjs'
import { User } from '../@types'
import { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
  crn: number | null
}

interface RegisterServiceResponse {
  user: User
}

export class RegisterService {
  // eslint-disable-next-line prettier/prettier
  constructor(private repository: UsersRepository) { }

  async execute({
    name,
    email,
    password,
    crn,
  }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.repository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.repository.create({
      name,
      email,
      password_hash,
      crn,
    })

    return { user }
  }
}
