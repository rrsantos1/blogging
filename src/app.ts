import 'reflect-metadata'
import '@/lib/typeorm/typeorm'
import fastify from 'fastify'
import { personRoutes } from '@/http/controllers/person/routes'
import { globalErrorHandler } from './utils/global-error-handler'
import { categoryRoutes } from './http/controllers/category/routes'
import { blogRoutes } from './http/controllers/blog/routes'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { validateJwt } from './http/middlewares/jwt-validate'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: { expiresIn: '1h' }
})

app.addHook('onRequest', validateJwt)

app.register(personRoutes)
app.register(categoryRoutes)
app.register(blogRoutes)
app.setErrorHandler(globalErrorHandler)