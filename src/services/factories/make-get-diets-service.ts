import { FirestoreDietsRepository } from '@/repositories/firestore/firestore-diets-repository'
import { GetDietsService } from '../get-diets'

export function makeGetDietsService() {
  const dietsRepository = new FirestoreDietsRepository()

  const service = new GetDietsService(dietsRepository)

  return service
}
