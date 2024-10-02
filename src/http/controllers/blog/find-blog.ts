import { makeFindBlogUseCase } from "@/use-cases/factory/make-find-blog-use-case"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function findBlog(
    request: FastifyRequest, 
    reply: FastifyReply
) {
    const registerParamsSchema = z.object({
        id: z.coerce.number()
    })

    const { id } = registerParamsSchema.parse(request.params)

    const findBlogUseCase = makeFindBlogUseCase()

    const blog = await findBlogUseCase.handler(id)

    return reply.status(200).send(blog)
}