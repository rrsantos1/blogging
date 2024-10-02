import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { IPersonRepository } from "@/repositories/person.repository.interface";
import { IPerson } from "@/entities/models/person.interface";

export class FindWithPersonIdUseCase {
    constructor(private personRepository: IPersonRepository) {}

    async handler(id: number): Promise<IPerson | undefined> {
        const person = await this.personRepository.findWithPersonId(id)

        if (!person) throw new ResourceNotFoundError()
            return person
    }
}