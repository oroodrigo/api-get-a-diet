import { CollectionReference } from 'firebase/firestore'
import { User } from '.'

declare module 'firebase/firestore' {
  interface Firestore {
    users: CollectionReference<User>
  }
}
