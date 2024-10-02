import { BlogRepository } from "@/repositories/typeorm/blog.repository"
import { CreateBlogUseCase } from "../create-blog"

export function makeCreateBlogUseCase () {
    const blogRepository = new BlogRepository()
    const createBlogUseCase = new CreateBlogUseCase(blogRepository)

    return createBlogUseCase
}