import { BlogRepository } from "@/repositories/typeorm/blog.repository"
import { FindAllBlogUseCase } from "../find-all-blogs"

export function makeFindAllBlogUseCase() {
    const blogRepository = new BlogRepository()

    const findAllBlogUseCase = new FindAllBlogUseCase(blogRepository)

    return findAllBlogUseCase
}