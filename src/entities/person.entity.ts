import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { IPerson } from "./models/person.interface"
import { Blog } from "./blog.entity"

@Entity({
    name: 'person'
})

export class Person implements IPerson {
    @PrimaryGeneratedColumn('increment', { 
        name: 'id' 
    })
    id?: number | undefined
    
    @Column({
        name: 'perfil',
        type: 'varchar'
    })
    perfil: string

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
    
    // Relacionamento inverso (Uma pessoa pode ter muitos blogs)
    @OneToMany(() => Blog, (blog) => blog.person)
    blogs: Blog[];
}