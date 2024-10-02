import { PersonRepository } from "@/repositories/pg/person.repository"
import { FindWithPersonIdUseCase } from "../find-with-person-id"

export function makeFindWithPersonUseCase() {
  const personRepository = new PersonRepository()
  const findWithPersonUseCase = new FindWithPersonIdUseCase(personRepository)

  return findWithPersonUseCase
}