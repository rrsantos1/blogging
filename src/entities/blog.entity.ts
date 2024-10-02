import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IBlog } from "./models/blog.interface";

@Entity({
    name: 'blog'
})

export class Blog implements IBlog {    
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
      })
      id?: number | undefined

    @Column({
        name: 'title',
        type: 'varchar',
    })
    title: string 

    @Column({
        name: 'description',
        type: 'varchar',
      })
      description: string

    @Column({
        name: 'category_id',
        type: 'integer',
    })
    category_id?: number | undefined

    @Column ({
        name: 'person_id',
        type: 'integer'
    })
    person_id?: number | undefined  

    @Column({
        name: 'creation_date',
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP'
    })          
    creation_date?: Date

    @Column({
        name: 'update_date',
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP'
    })
    update_date: Date    
}