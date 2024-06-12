import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { CheckDaysInOffensiveService } from './check-days-in-offensive'
import { randomUUID } from 'crypto'

let usersRepository: InMemoryUsersRepository
let sut: CheckDaysInOffensiveService

beforeEach(() => {
  usersRepository = new InMemoryUsersRepository()
  sut = new CheckDaysInOffensiveService(usersRepository)
})

describe('Check Days In Offensive Service', () => {
  it('should be able to check and increment the counter if all meals are done.', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    user.diet = {
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
          completed: new Date(),
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
          completed: new Date(),
        },
      ],
      author_id: user.id,
      author_name: user.name,
      id: randomUUID(),
      orientations: null,
    }
    await sut.execute()

    expect(user.days_in_offensive).toBe(1)
  })

  it('should be able to check and reset counter if any meals are not done.', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    user.diet = {
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
          completed: new Date(),
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
      author_name: user.name,
      id: randomUUID(),
      orientations: null,
    }

    user.days_in_offensive = 10

    await sut.execute()

    expect(user.days_in_offensive).toEqual(0)
  })
})
