import { UsersRepository } from '@/repositories/users-repository'

export class CheckDaysInOffensiveService {
  // eslint-disable-next-line prettier/prettier
  constructor(private userRepository: UsersRepository) { }

  async execute(): Promise<void> {
    this.userRepository.checkDaysInOffensive()
  }
}
