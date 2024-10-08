import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { IBlog } from "./models/blog.interface"
import { Person } from "./person.entity"  
import { Category } from "./category.entity"

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

    // Relacionamento com a entidade Category (Muitos Blogs para uma Categoria)
    @ManyToOne(() => Category, { nullable: false, onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    // Relacionamento com a entidade Person (Muitos Blogs para uma Pessoa)
    @ManyToOne(() => Person, { nullable: false, onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'person_id' })
    person: Person;

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
