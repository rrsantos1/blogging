import { makeCreateCategoryUseCase } from "@/use-cases/factory/make-create-category-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({   
        name: z.string(),
        creation_date: z.coerce.date(),
    })

    const { name, creation_date } = registerBodySchema.parse(request.body)

    const CreateCategoryUseCase = makeCreateCategoryUseCase()
    
    await CreateCategoryUseCase.handler({
        name,
        creation_date
    })

    return reply.code(201).send()
}