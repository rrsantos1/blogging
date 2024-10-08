import { IBlog } from "@/entities/models/blog.interface"
import { ILike, Repository } from "typeorm"
import { IBlogRepository } from "../blog.repository.interface"
import { Blog } from "@/entities/blog.entity"
import { appDataSource } from "@/lib/typeorm/typeorm"
import { Person } from "@/entities/person.entity"
import { FastifyRequest, FastifyReply } from "fastify"

export class BlogRepository implements IBlogRepository {
    private repository: Repository<Blog>
    personRepository: Repository<Person>
    request: FastifyRequest 
    reply: FastifyReply
    
    constructor() {
        this.repository = appDataSource.getRepository(Blog)
        this.personRepository = appDataSource.getRepository(Person)
    }
    findByKeyWord(keyword: string, page: number, limit: number): Promise<IBlog[] | null> {
        return this.repository.find({            
            skip: (page - 1) * limit,
            take: limit,
            where: [
                { title: ILike(`%${keyword}%`) },
                { description: ILike(`%${keyword}%`) }
            ]
        })
    }
    
    async findAllByAdmin(personId: number, page: number, limit: number): Promise<IBlog[] | null> {
        const person = await this.personRepository.findOne({ where: { id: personId } })
        
        if (person && person.perfil === 'admin') {
            return this.repository.find({
                where: { person: { id: personId } },
                skip: (page - 1) * limit,
                take: limit,
            })
        }
        return null
    }
    async findAll(page: number, limit: number, options?: { relations?: string[] }) {
        const queryBuilder = this.repository.createQueryBuilder("blog")
            .leftJoinAndSelect("blog.person", "person")
            .leftJoinAndSelect("blog.category", "category")
            .select([
                "blog.id",
                "blog.title",
                "blog.description",
                "blog.creation_date",
                "blog.update_date",
                "person.id",       // Selecionando apenas o id
                "person.name",     // Selecionando apenas o name
                "category.id",
                "category.name"
            ])
            .skip((page - 1) * limit)
            .take(limit);

        return await queryBuilder.getMany();
    }
    async findById(id: number): Promise<IBlog | null> {
        const queryBuilder = this.repository.createQueryBuilder("blog")
            .leftJoinAndSelect("blog.person", "person")
            .leftJoinAndSelect("blog.category", "category")
            .select([
                "blog.id",
                "blog.title",
                "blog.description",
                "person.id",      // Selecionando apenas o id
                "person.name",    // Selecionando apenas o name
                "category.id",    // Selecionando apenas o id
                "category.name"   // Selecionando apenas o name
            ])
            .where("blog.id = :id", { id });

        return await queryBuilder.getOne();
    }
    async create(blog: IBlog): Promise<IBlog> {
        return this.repository.save(blog)
    }
    async update(blog: IBlog): Promise<IBlog> {
        return this.repository.save(blog)
    }
    async delete(id: number): Promise<void> {
        await this.repository.delete(id)
    }    
}