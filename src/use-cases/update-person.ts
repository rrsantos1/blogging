import { IPerson } from '@/entities/models/person.interface'
import { PersonRepository } from '@/repositories/pg/person.repository'

export class UpdatePersonUseCase {
    constructor(private personRepository: PersonRepository) {}

    async handler(person: IPerson): Promise<IPerson | undefined> {
        return this.personRepository.update(person)
    }
}