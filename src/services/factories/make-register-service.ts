import { FirestoreUsersRepository } from '../../repositories/firestore/firestore-users-repository'
import { RegisterService } from '../register'

export function makeRegisterService() {
  const usersRepository = new FirestoreUsersRepository()
  const service = new RegisterService(usersRepository)

  return service
}
