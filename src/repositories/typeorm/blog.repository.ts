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
                where: { person_id: personId },
                skip: (page - 1) * limit,
                take: limit,
            })
        }
        return null
    }
    async findAll(page: number, limit: number): Promise<IBlog[]> {
        return this.repository.find({            
            skip: (page - 1) * limit,
            take: limit
        })
    }
    async findById(id: number): Promise<IBlog | null> {
        return this.repository.findOne({            
            where: { id },
        })
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