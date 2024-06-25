import { FirestoreDietsRepository } from '@/repositories/firestore/firestore-diets-repository'
import { FirestoreUsersRepository } from '@/repositories/firestore/firestore-users-repository'
import { UpdateUserDietService } from '../update-user-diet'

export function makeUpdateUserDietService() {
  const dietsRepository = new FirestoreDietsRepository()
  const usersRepository = new FirestoreUsersRepository()

  const service = new UpdateUserDietService(usersRepository, dietsRepository)

  return service
}
