import { FastifyReply, FastifyRequest } from 'fastify'

export async function signOut(request: FastifyRequest, reply: FastifyReply) {
  return reply
    .clearCookie('get-a-diet.refreshToken', { path: '/', httpOnly: true })
    .status(200)
    .send()
}
