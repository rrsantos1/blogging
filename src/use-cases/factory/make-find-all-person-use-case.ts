import { PersonRepository } from "@/repositories/typeorm/person.repository"
import { FindAllPersonUseCase } from "../find-all-persons"

export function makeFindAllPersonUseCase() {
    const personRepository = new PersonRepository()

    const findAllPersonUseCase = new FindAllPersonUseCase(personRepository)

    return findAllPersonUseCase
}