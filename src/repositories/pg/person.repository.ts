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
    public async findById(id: number): Promise<IPerson> {
        return {
            id,
            cpf: '12345678901',
            name: 'John Doe',
            birth: new Date('1990-01-01'),
            email: 'test@gmail.com',
            username: 'johndoe',
            password: '123456'
        }
    }

    public async create({cpf, name, birth, email, username, password}: IPerson): Promise<IPerson | undefined> {
        const result = await database.clientInstance?.query<IPerson>(`INSERT INTO "person" 
            (cpf, name, birth, email, username, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, 
            [cpf, name, birth, email, username, password]
        )
        return result?.rows[0]
    }

    public async update({id, cpf, name, birth, email, username, password}:IPerson): Promise<IPerson | undefined> {
        const result = await database.clientInstance?.query<IPerson>(`UPDATE "person" SET cpf = $1, name = $2, birth = $3, email = $4, username = $5, password = $6 WHERE id = $7 RETURNING *`, 
            [cpf, name, birth, email, username, password, id]
        )
        return result?.rows[0]
    }

    public async findWithPersonId(id: number): Promise<IPerson | undefined> {
        const result = await database.clientInstance?.query<IPerson>(`SELECT * FROM "person" WHERE id = $1`, [id])
        return result?.rows[0]
    }
}