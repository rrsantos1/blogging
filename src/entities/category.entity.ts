import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ICategory } from "./models/category.interface";
import { Blog } from "./blog.entity";

@Entity({
    name: 'category'
})

export class Category implements ICategory {
    
    @PrimaryGeneratedColumn('increment', { 
        name: 'id' 
    })
    id?: number | undefined

    @Column({
        name: 'name',
        type: 'varchar'
    })
    name: string
    
    @Column({
        name: 'creation_date',
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP'
    })
    creation_date?: Date

    // Relacionamento inverso (Uma categoria pode ter muitos blogs)
    @OneToMany(() => Blog, (blog) => blog.category)
    blogs: Blog[];
}