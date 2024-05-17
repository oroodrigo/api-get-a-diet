import { FirestoreDietsRepository } from '@/repositories/firestore/firestore-diets-repository'
import { FirestoreUsersRepository } from '@/repositories/firestore/firestore-users-repository'
import { CreateDietService } from '../create-diet'

export function makeCreateDietService() {
  const dietsRepository = new FirestoreDietsRepository()
  const usersRepository = new FirestoreUsersRepository()

  const service = new CreateDietService(dietsRepository, usersRepository)

  return service
}
