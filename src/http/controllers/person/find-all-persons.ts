import { makeFindAllPersonUseCase } from "@/use-cases/factory/make-find-all-person-use-case"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function findAllPerson(
    request: FastifyRequest, 
    reply: FastifyReply
) {
    const registerParamsSchema = z.object({
        page: z.coerce.number().default(1),
        limit: z.coerce.number().default(10)
    })

    const { page, limit } = registerParamsSchema.parse(request.query)   

    const findAllPersonUseCase = makeFindAllPersonUseCase()

    const persons = await findAllPersonUseCase.handler(page, limit)

    if (!persons) {
        return reply.status(404).send({ error: "No persons found" })
    }

    // Mapeia os dados para retornar apenas id e nome
    const filteredPersons = persons.map(person => {
        return {
            id: person.id,
            name: person.name,
            perfil: person.perfil
        }
    })

    return reply.status(200).send(filteredPersons)
}