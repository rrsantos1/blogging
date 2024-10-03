import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFindWithPersonUseCase } from "@/use-cases/factory/make-find-with-person"

export async function findUser(request: FastifyRequest, reply: FastifyReply) {  
    const registerParamsSchema = z.object({ 
        id: z.coerce.number()
    })

    const { id } = registerParamsSchema.parse(request.params)

    const findWithPersonIdUseCase = makeFindWithPersonUseCase()

    const person = await findWithPersonIdUseCase.handler(id)

    return reply.status(200).send({id: person?.id, perfil: person?.perfil, name: person?.name, username: person?.username})    
}      