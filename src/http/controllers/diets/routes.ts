import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyIfUserHasCRN } from '@/http/middlewares/verify-if-user-has-crn'

export async function dietsRoute(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/diets', { onRequest: [verifyIfUserHasCRN()] }, create)
}
