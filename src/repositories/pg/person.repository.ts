import { database } from '@/lib/pg/db';
import { IPersonRepository } from '../person.repository.interface';
import { IPerson } from '@/entities/models/person.interface';

export class PersonRepository implements IPersonRepository{
    async findByUsername(username: string): Promise<IPerson | undefined> {
        const result = await database.clientInstance?.query<IPerson>(
            `SELECT * FROM "person" WHERE "person".username = $1`, 
            [username],)
        return result?.rows[0]
    }   

    public async create({perfil, name, birth, email, username, password}: IPerson): Promise<IPerson | undefined> {
        const result = await database.clientInstance?.query<IPerson>(`INSERT INTO "person" 
            (perfil, name, birth, email, username, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, 
            [perfil, name, birth, email, username, password]
        )
        return result?.rows[0]
    }    

    public async findWithPersonId(id: number): Promise<IPerson | undefined> {
        const result = await database.clientInstance?.query<IPerson>(`SELECT * FROM "person" WHERE id = $1`, [id])
        return result?.rows[0]
    }
}