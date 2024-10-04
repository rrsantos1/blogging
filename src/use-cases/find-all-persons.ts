import { IPersonRepository } from "@/repositories/person.repository.interface";

export class FindAllPersonUseCase {
    constructor(private personRepository: IPersonRepository) {}

    async handler(page: number, limit: number) {
        return this.personRepository.findAllPerson(page, limit)
    }
}