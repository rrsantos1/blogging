import { IPerson } from "@/entities/models/person.interface";

export interface IPersonRepository {
    create(person: IPerson): Promise<IPerson | undefined>
    findWithPersonId(id: number): Promise<IPerson | undefined>
    findByUsername(username: string): Promise<IPerson | undefined>
}