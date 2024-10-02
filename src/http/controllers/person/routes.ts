import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findUser } from './find-user'
import { signin } from './signin'

export async function personRoutes(app: FastifyInstance) {
  app.get('/person/:id', findUser)
  app.post('/person', create) 
  app.post('/person/signin', signin)   
}