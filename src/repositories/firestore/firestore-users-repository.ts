import { doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { UserCreateInput, User } from '../../@types'
import { firestore } from '../../lib/firebase'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class FirestoreUsersRepository implements UsersRepository {
  async checkDaysInOffensive(): Promise<void> {
    const searchQuery = query(firestore.users)

    const querySnapshot = await getDocs(searchQuery)
    const usersSnapshot = querySnapshot.docs

    if (usersSnapshot.length > 0) {
      usersSnapshot.forEach(async (snapshot) => {
        const user = snapshot.data()

        if (user.diet) {
          const isAllMealsCompleted = user.diet.meals.every(
            (meal) => meal.completed,
          )

          if (!isAllMealsCompleted) {
            user.days_in_offensive = 0
          } else {
            user.days_in_offensive += 1
          }

          user.diet.meals.forEach((meal) => (meal.completed = null))

          await setDoc(doc(firestore.users, user.id), user)
        }
      })
    }
  }

  async findById(id: string): Promise<User | null> {
    const searchQuery = query(firestore.users, where('id', '==', id))

    const querySnapshot = await getDocs(searchQuery)
    const userSnapshot = querySnapshot.docs

    if (userSnapshot.length === 0) {
      return null
    }

    const user = userSnapshot[0].data()

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const searchQuery = query(firestore.users, where('email', '==', email))

    const querySnapshot = await getDocs(searchQuery)
    const userSnapshot = querySnapshot.docs

    if (userSnapshot.length === 0) {
      return null
    }

    const user = userSnapshot[0].data()

    return user
  }

  async create(data: UserCreateInput): Promise<User> {
    const id = randomUUID()

    const user: User = {
      id,
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      image_url: null,
      crn: data.crn ?? null,
      diet: null,
      days_in_offensive: 0,
    }

    await setDoc(doc(firestore.users, id), user)

    return user
  }
}
