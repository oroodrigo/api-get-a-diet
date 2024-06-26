import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const { crn } = request.user

  const token = await reply.jwtSign(
    { crn },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    { crn },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  const sevenDaysInSeconds = 60 * 60 * 24 * 7

  return reply
    .setCookie('get-a-diet.refreshToken', refreshToken, {
      path: '/',
      secure: true,
      maxAge: sevenDaysInSeconds,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token })
}
