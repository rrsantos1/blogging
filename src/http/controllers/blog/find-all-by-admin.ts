import { makeFindAllByAdminUseCase } from "@/use-cases/factory/make-find-all-by-admin-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function findAllByAdmin(
    request: FastifyRequest, 
    reply: FastifyReply
) {
    const querySchema = z.object({
        page: z.coerce.number().default(1),
        limit: z.coerce.number().default(10)
    })

    const { page, limit } = querySchema.parse(request.query)

    // Recupera o person_id do token JWT
    const { person_id } = request.user as { person_id: number }

    const findAllByAdminUseCase = makeFindAllByAdminUseCase()

    const blog = await findAllByAdminUseCase.handler(person_id, page, limit)

    return reply.status(200).send(blog)
}