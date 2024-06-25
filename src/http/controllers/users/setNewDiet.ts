import { FastifyReply, FastifyRequest } from 'fastify'
import { makeUpdateUserDietService } from '@/services/factories/make-update-user-diet-service'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'

export async function setNewDiet(request: FastifyRequest, reply: FastifyReply) {
  const setNewDietBody = z.object({
    dietId: z.string().uuid(),
  })

  const { dietId } = setNewDietBody.parse(request.body)

  const updateUserDietService = makeUpdateUserDietService()

  try {
    const { userWithNewDiet } = await updateUserDietService.execute({
      userId: request.user.sub,
      dietId,
    })

    return reply.status(200).send({
      user: {
        ...userWithNewDiet,
        password_hash: undefined,
      },
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
    throw err
  }
}
