import { Diet } from '../@types'

import { DietsRepository } from '@/repositories/diets-repository'

interface GetDietsServiceResponse {
  diets: Diet[] | null
}

export class GetDietsService {
  // eslint-disable-next-line prettier/prettier
  constructor(private dietsrepository: DietsRepository) { }

  async execute(): Promise<GetDietsServiceResponse> {
    const diets = await this.dietsrepository.getAll()

    return { diets }
  }
}
