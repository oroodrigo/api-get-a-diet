import { Diet, DietCreateInput } from '../@types'

export interface DietsRepository {
  findById(id: string): Promise<Diet | null>
  findByAuthorId(authorId: string): Promise<Diet | null>
  create(data: DietCreateInput): Promise<Diet>
}
