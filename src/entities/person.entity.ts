import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { IPerson } from "./models/person.interface"

@Entity({
    name: 'person'
})

export class Person implements IPerson {
    @PrimaryGeneratedColumn('increment', { 
        name: 'id' 
    })
    id?: number | undefined
    
    @Column({
        name: 'cpf',
        type: 'varchar'
    })
    cpf?: string

    @Column({
        name: 'name',
        type: 'varchar'
    })
    name: string

    @Column({
        name: 'birth',
        type: 'date'
    })
    birth?: Date

    @Column({
        name: 'email',
        type: 'varchar'
    })
    email?: string

    @Column({
        name: 'username',
        type: 'varchar'
    })
    username?: string

    @Column({
        name: 'password',
        type: 'varchar'
    })
    password?: string        
}