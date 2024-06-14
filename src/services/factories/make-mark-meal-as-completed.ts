import { FirestoreUsersRepository } from '@/repositories/firestore/firestore-users-repository'
import { MarkMealAsCompletedService } from '../mark-meal-as-completed'

export function makeMarkMealAsCompletedService() {
  const usersRepository = new FirestoreUsersRepository()
  const service = new MarkMealAsCompletedService(usersRepository)

  return service
}
