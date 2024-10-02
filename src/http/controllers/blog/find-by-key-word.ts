import { makeFindByKeyWordUseCase } from "@/use-cases/factory/make-find-by-key-word-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function findByKeyWord(
    request: FastifyRequest, 
    reply: FastifyReply
) {
    const registerParamsSchema = z.object({
        keyword: z.string(),               
        page: z.coerce.number().default(1),
        limit: z.coerce.number().default(10)      
    })

    const { keyword, page, limit } = registerParamsSchema.parse(request.query)

    const findByKeyWordUseCase = makeFindByKeyWordUseCase()

    const blog = await findByKeyWordUseCase.handler(keyword, page, limit)

    return reply.status(200).send(blog)
}