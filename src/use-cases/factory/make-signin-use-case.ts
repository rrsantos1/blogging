import { PersonRepository } from "@/repositories/pg/person.repository"
import { SigninUseCase } from "../signin"

export function makeSigninUseCase() {
    const personRepository = new PersonRepository()

    const signinUseCase = new SigninUseCase(personRepository)

    return signinUseCase
}