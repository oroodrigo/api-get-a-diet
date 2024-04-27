import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyIfUserHasCRN() {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { crn } = request.user

    if (!crn) {
      reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
