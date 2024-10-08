import { IBlog } from "@/entities/models/blog.interface";

export interface IBlogRepository {
    findAll(page: number, limit: number, options?: { relations?: string[] }): Promise<IBlog[]>
    findById(id: number): Promise<IBlog | null>
    findByKeyWord(keyword: string, page: number, limit: number): Promise<IBlog[] | null>    
    create(blog: IBlog): Promise<IBlog>
    update(blog: IBlog): Promise<IBlog>
    delete(id: number): Promise<void>
    findAllByAdmin(personId: number, page: number, limit: number): Promise<IBlog[] | null>
}