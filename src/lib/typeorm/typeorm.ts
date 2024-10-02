import { DataSource } from "typeorm";
import { env } from "@/env"
import { Category } from "@/entities/category.entity"
import { Blog } from "@/entities/blog.entity";
import { Person } from "@/entities/person.entity";

export const appDataSource = new DataSource({
    type: 'postgres',
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    entities: [Category, Blog, Person],
    synchronize: true,    
    logging: env.NODE_ENV === 'development',
})

appDataSource.initialize().then(() => {
    console.log('Database with typeorm connected')
}).catch((error) => {
    console.error('Error connecting to database with typeorm', error)
})