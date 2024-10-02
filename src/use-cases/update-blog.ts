import { IBlog } from "@/entities/models/blog.interface";
import { IBlogRepository } from "@/repositories/blog.repository.interface";

export class UpdateBlogUseCase {
    constructor(private blogRepository: IBlogRepository) {}

    async handler(blog: IBlog) {        
        return this.blogRepository.update(blog)
    }
}