import { IPersonRepository } from "@/repositories/person.repository.interface"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"

export class SigninUseCase {
    constructor(private readonly personRepository: IPersonRepository) {}
        
    async handler (username: string) {
        const person = await this.personRepository.findByUsername(username)
        
        if (!person) {
            throw new InvalidCredentialsError()
        }
        return person
    }    
}