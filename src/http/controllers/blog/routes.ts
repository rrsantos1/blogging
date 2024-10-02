import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findBlog } from './find-blog'
import { findAllBlog } from './find-all-blog'
import { update } from './update'
import { deleteBlog } from './delete'
import { findByKeyWord } from './find-by-key-word'

export async function blogRoutes(app: FastifyInstance) {
  app.get('/posts', findAllBlog)
  app.get('/posts/:id', findBlog)
  app.get('/posts/search', findByKeyWord)
  app.post('/posts', create)
  app.put('/posts/:id', update)
  app.delete('/posts/:id', deleteBlog)
}