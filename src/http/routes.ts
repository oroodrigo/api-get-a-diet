import { FastifyInstance } from 'fastify'
import { register } from './controllers/users/register'

export async function usersRoute(app: FastifyInstance) {
  app.post('/users', register)
}