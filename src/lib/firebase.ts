import { initializeApp } from 'firebase/app'
import {
  CollectionReference,
  DocumentData,
  collection,
  getFirestore,
} from 'firebase/firestore'
import { env } from '../env'
import { User } from '../@types'

const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
}

const firebaseApp = initializeApp(firebaseConfig)

export const firestore = getFirestore(firebaseApp)

function createCollection<T = DocumentData>(collectionName: string) {
  return collection(firestore, collectionName) as CollectionReference<T>
}

firestore.users = createCollection<User>('users')
