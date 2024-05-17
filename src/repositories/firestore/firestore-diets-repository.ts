import { doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { Diet, DietCreateInput } from '../../@types'
import { firestore } from '../../lib/firebase'
import { randomUUID } from 'node:crypto'
import { DietsRepository } from '../diets-repository'

export class FirestoreDietsRepository implements DietsRepository {
  async findById(id: string): Promise<Diet | null> {
    const searchQuery = query(firestore.diets, where('id', '==', id))

    const querySnapshot = await getDocs(searchQuery)
    const dietSnapshot = querySnapshot.docs

    if (dietSnapshot.length === 0) {
      return null
    }

    const diet = dietSnapshot[0].data()

    return diet
  }

  async findByAuthorId(author_id: string): Promise<Diet | null> {
    const searchQuery = query(
      firestore.diets,
      where('author_id', '==', author_id),
    )

    const querySnapshot = await getDocs(searchQuery)
    const dietSnapshot = querySnapshot.docs

    if (dietSnapshot.length === 0) {
      return null
    }

    const diet = dietSnapshot[0].data()

    return diet
  }

  async create(data: DietCreateInput): Promise<Diet> {
    const id = randomUUID()

    const diet: Diet = {
      id,
      title: data.title,
      meals: data.meals,
      author_id: data.author_id,
      author_name: data.author_name,
    }

    await setDoc(doc(firestore.diets, id), diet)

    return diet
  }
}
