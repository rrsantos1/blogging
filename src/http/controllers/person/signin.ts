import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeSigninUseCase } from "@/use-cases/factory/make-signin-use-case";
import { compare } from "bcryptjs";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function signin(
    request: FastifyRequest, 
    reply: FastifyReply
) {
    const registerBodySchema = z.object({
        username: z.string(),
        password: z.string()
    })

    const { username, password } = registerBodySchema.parse(request.body)

    const signinUseCase = makeSigninUseCase()

    const person = await signinUseCase.handler(username)

    if (!person.password) {
        throw new InvalidCredentialsError()
    }
    
    const doesntPasswordMatch = await compare(password, person.password)
    
    if (!doesntPasswordMatch) {
        throw new InvalidCredentialsError()
    }

    const token = await reply.jwtSign({ username, perfil: person.perfil })

    return reply.status(200).send({ token })
}
