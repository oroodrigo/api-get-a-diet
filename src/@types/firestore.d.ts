import { CollectionReference } from 'firebase/firestore'
import { Diet, User } from '.'

declare module 'firebase/firestore' {
  interface Firestore {
    users: CollectionReference<User>
    diets: CollectionReference<Diet>
  }
}
