import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh'
import { checkCRN } from './checkCRN'
import { signOut } from './sign-out'

export async function usersRoute(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.post('/verify/crn', checkCRN)

  app.patch('/token/refresh', refresh)
  app.delete('/sessions', signOut)
  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
