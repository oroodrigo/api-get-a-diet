import { FirestoreUsersRepository } from '@/repositories/firestore/firestore-users-repository'
import { GetUserProfileService } from '../get-user-profile'

export function makeGetUserProfileService() {
  const usersRepository = new FirestoreUsersRepository()
  const service = new GetUserProfileService(usersRepository)

  return service
}
