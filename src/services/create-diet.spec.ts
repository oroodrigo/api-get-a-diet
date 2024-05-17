import { beforeEach, describe, expect, it } from 'vitest'

import { CreateDietService } from './create-diet'
import { UnauthorizedError } from './errors/unauthorized-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryDietsRepository } from '@/repositories/in-memory/in-memory-diets-repository'

let usersRepository: InMemoryUsersRepository
let dietsRepository: InMemoryDietsRepository
let sut: CreateDietService

beforeEach(() => {
  usersRepository = new InMemoryUsersRepository()

  dietsRepository = new InMemoryDietsRepository()
  sut = new CreateDietService(dietsRepository, usersRepository)
})

describe('Create Diet Service', () => {
  it('should be able to create a diet.', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
      crn: '9D981',
    })

    const { diet } = await sut.execute({
      title: 'Cutting',
      meals: [
        {
          title: 'Café da manhã',
          items: [
            { name: 'Pão', quantity: 2, unit: 'Un', description: null },
            {
              name: 'Ovo mexido',
              quantity: 2,
              unit: 'Un',
              description: null,
            },
          ],
          completed: null,
        },
        {
          title: 'Almoço',
          items: [
            { name: 'Arroz', quantity: 100, unit: 'Gr', description: null },
            { name: 'Feijão', quantity: 50, unit: 'Gr', description: null },
            {
              name: 'Frango',
              quantity: 100,
              unit: 'Gr',
              description: 'Pode ser substituido por carne magra ou 2 ovos',
            },
          ],
          completed: null,
        },
      ],
      author_id: user.id,
    })

    expect(diet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a diet if user does not have crn.', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
      crn: null,
    })

    await expect(() =>
      sut.execute({
        title: 'Cutting',
        meals: [
          {
            title: 'Café da manhã',
            items: [
              { name: 'Pão', quantity: 2, unit: 'Un', description: null },
              {
                name: 'Ovo mexido',
                quantity: 2,
                unit: 'Un',
                description: null,
              },
            ],
            completed: null,
          },
          {
            title: 'Almoço',
            items: [
              { name: 'Arroz', quantity: 100, unit: 'Gr', description: null },
              { name: 'Feijão', quantity: 50, unit: 'Gr', description: null },
              {
                name: 'Frango',
                quantity: 100,
                unit: 'Gr',
                description: 'Pode ser substituido por carne magra ou 2 ovos',
              },
            ],
            completed: null,
          },
        ],
        author_id: user.id,
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
