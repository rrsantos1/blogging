
import { makeUpdateBlogUseCase } from "@/use-cases/factory/make-update-blog-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(
    request: FastifyRequest, 
    reply: FastifyReply
){
    const registerParamsSchema = z.object({
        id: z.coerce.number()
    })

    const { id } = registerParamsSchema.parse(request.params)

    const registerBodySchema = z.object({
        title: z.string(),
        description: z.string(),
        person_id: z.coerce.number(),
        category_id: z.coerce.number(),
        update_date: z.coerce.date()
    })

    const { title, description, person_id, category_id, update_date } = registerBodySchema.parse(request.body)

    const updateBlogUseCase = makeUpdateBlogUseCase()
    
    const blog = await updateBlogUseCase.handler({
        id,
        title,
        description,
        person_id,
        category_id,
        update_date
    })

    return reply.status(200).send(blog)
}