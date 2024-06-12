import { FirestoreUsersRepository } from '@/repositories/firestore/firestore-users-repository'
import { CheckDaysInOffensiveService } from '../check-days-in-offensive'

export function makeCheckDaysInOffensiveService() {
  const usersRepository = new FirestoreUsersRepository()
  const service = new CheckDaysInOffensiveService(usersRepository)

  return service
}
