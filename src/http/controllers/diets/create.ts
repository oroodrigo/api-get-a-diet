import { UnauthorizedError } from '@/services/errors/unauthorized-error'
import { makeCreateDietService } from '@/services/factories/make-create-diet-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const mealItemSchema = z.object({
    name: z.string(),
    description: z.string().or(z.null()),
    quantity: z.number(),
    unit: z.string(),
  })

  const mealSchema = z.object({
    title: z.string(),
    items: z
      .array(mealItemSchema)
      .nonempty({ message: 'Meal items cannot be empty.' }),
    completed: z.null().default(null),
  })

  const createDietBodySchema = z.object({
    title: z.string(),
    meals: z.array(mealSchema).nonempty({ message: 'Meals cannot be empty.' }),
  })

  const { title, meals } = createDietBodySchema.parse(request.body)

  try {
    const createDietService = makeCreateDietService()

    await createDietService.execute({
      title,
      meals,
      author_id: request.user.sub,
    })
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return reply.status(401).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
