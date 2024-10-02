import { makeDeleteBlogUseCase } from "@/use-cases/factory/make-delete-blog-use-case"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function deleteBlog(
    request: FastifyRequest, 
    reply: FastifyReply
) {
    const registerParamsSchema = z.object({
        id: z.coerce.number()
    })

    const { id } = registerParamsSchema.parse(request.params)

    const deleteBlogUseCase = makeDeleteBlogUseCase()

    const blog = await deleteBlogUseCase.handler(id)

    return reply.status(204).send(blog)
}