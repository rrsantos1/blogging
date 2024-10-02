import { makeFindAllBlogUseCase } from "@/use-cases/factory/make-find-all-blog-use-case"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function findAllBlog(
    request: FastifyRequest, 
    reply: FastifyReply
) {
    const registerParamsSchema = z.object({
        page: z.coerce.number().default(1),
        limit: z.coerce.number().default(10)
    })

    const { page, limit } = registerParamsSchema.parse(request.query)   

    const findAllBlogUseCase = makeFindAllBlogUseCase()

    const blog = await findAllBlogUseCase.handler(page, limit)

    return reply.status(200).send(blog)
}