import { doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { UserCreateInput, User } from '../../@types'
import { firestore } from '../../lib/firebase'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class FirestoreUsersRepository implements UsersRepository {
  async create(data: UserCreateInput): Promise<User> {
    const id = randomUUID()

    const user: User = {
      id,
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      crn: data.crn ?? null,
    }

    await setDoc(doc(firestore.users, id), user)

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
}
