import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findAllCategory } from './find-all-category'

export async function categoryRoutes(app: FastifyInstance) {
  app.post('/category', create)
  app.get('/category', findAllCategory)
}