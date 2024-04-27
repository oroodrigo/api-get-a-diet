import { FirestoreUsersRepository } from '../../repositories/firestore/firestore-users-repository'
import { AuthenticateService } from '../authenticate'

export function makeAuthenticateService() {
  const usersRepository = new FirestoreUsersRepository()
  const service = new AuthenticateService(usersRepository)

  return service
}
