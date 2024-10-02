import { makeCreateBlogUseCase } from "@/use-cases/factory/make-create-blog-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({           
        title: z.string(),
        description: z.string(),
        person_id: z.coerce.number(),
        category_id: z.coerce.number(),
        creation_date: z.coerce.date(),
        update_date: z.coerce.date()
    })

    const { title, description, person_id, category_id, creation_date, update_date } = registerBodySchema.parse(request.body)

    const CreateBlogUseCase = makeCreateBlogUseCase()
    
    await CreateBlogUseCase.handler({
        title,
        description,
        person_id,
        category_id,
        creation_date,
        update_date
    })

    return reply.code(201).send()
}