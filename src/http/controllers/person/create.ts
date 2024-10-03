import { makeCreatePersonUseCase } from '@/use-cases/factory/make-create-person-use-case'
import { hash } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


export async function create(request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        perfil: z.string(),
        name: z.string(),
        birth: z.coerce.date(),
        email: z.string().email(),
        username: z.string(),
        password: z.string(),   
    })

    const { perfil, name, birth, email, username, password } = registerBodySchema.parse(request.body)

    const hashedPassword = await hash(password, 8)

    const personWithHashedPassword = { perfil, name, birth, email, username, password: hashedPassword }

    const createPersonUseCase = makeCreatePersonUseCase()

    const person = await createPersonUseCase.handler(personWithHashedPassword)

    return reply.status(201).send({id: person?.id, name: person?.name, username: person?.username})  
}