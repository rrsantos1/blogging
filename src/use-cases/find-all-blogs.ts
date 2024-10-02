import { IBlogRepository } from "@/repositories/blog.repository.interface";

export class FindAllBlogUseCase {
    constructor(private blogRepository: IBlogRepository) {}

    async handler(page: number, limit: number) {
        return this.blogRepository.findAll(page, limit)
    }
}