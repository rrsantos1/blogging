import { IBlog } from "@/entities/models/blog.interface";
import { IBlogRepository } from "@/repositories/blog.repository.interface";

export class CreateBlogUseCase {
    constructor(private blogRepository: IBlogRepository) {}

    async handler(blog: IBlog): Promise<IBlog> {
        return this.blogRepository.create(blog)
    }
}