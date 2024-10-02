import { IBlogRepository } from "@/repositories/blog.repository.interface";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

export class FindByKeyWordUseCase {
    constructor(private blogRepository: IBlogRepository) {}

    async handler(keyword: string, page: number, limit: number) {
        const blog = await this.blogRepository.findByKeyWord(keyword, page, limit)

        if (!blog) {
            throw new ResourceNotFoundError()
        }
        return blog
    }
}