import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { verifyCRNSubscription } from '@/services/scraper/verifyCRNSubscription'

export async function checkCRN(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    crn: z.string().optional(),
  })

  const { crn } = registerBodySchema.parse(request.body)

  const subscription = crn ?? null

  const crnInfo = await verifyCRNSubscription(subscription)

  return reply.status(200).send({ crnInfo })
}
