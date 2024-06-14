import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { randomUUID } from 'crypto'
import { MarkMealAsCompletedService } from './mark-meal-as-completed'

let usersRepository: InMemoryUsersRepository
let sut: MarkMealAsCompletedService

const mockDiet = {
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
  author_id: 'user.id',
  author_name: 'user.name',
  id: randomUUID(),
  orientations: null,
}

beforeEach(() => {
  usersRepository = new InMemoryUsersRepository()
  sut = new MarkMealAsCompletedService(usersRepository)
})

describe('Mark Meal As Completed Service', () => {
  it('should be able to mark meal as completed.', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    createdUser.diet = mockDiet

    const { mealMarked } = await sut.execute({
      userId: createdUser.id,
      title: createdUser.diet.meals[0].title,
    })

    expect(mealMarked.completed).toEqual(expect.any(Date))
  })

  it('should not be able to mark a meal if user has not a diet.', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        userId: createdUser.id,
        title: 'non-existing-title',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to mark an undefined meal.', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    createdUser.diet = mockDiet

    await expect(() =>
      sut.execute({
        userId: createdUser.id,
        title: 'non-existing-title',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
