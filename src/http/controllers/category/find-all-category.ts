import { makeFindAllCategoryUseCase } from "@/use-cases/factory/make-find-all-category-use-case"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function findAllCategory(
    request: FastifyRequest, 
    reply: FastifyReply
) {
    const registerParamsSchema = z.object({
        page: z.coerce.number().default(1),
        limit: z.coerce.number().default(10)
    })

    const { page, limit } = registerParamsSchema.parse(request.query)   

    const findAllCategoryUseCase = makeFindAllCategoryUseCase()

    const category = await findAllCategoryUseCase.handler(page, limit)

    return reply.status(200).send(category)
}