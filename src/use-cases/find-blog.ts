import { IBlogRepository } from "@/repositories/blog.repository.interface";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

export class FindBlogUseCase {
    constructor(private blogRepository: IBlogRepository) {}

    async handler(id: number) {
        const blog = await this.blogRepository.findById(id)

        if (!blog) {
            throw new ResourceNotFoundError()
        }
        return blog
    }
}