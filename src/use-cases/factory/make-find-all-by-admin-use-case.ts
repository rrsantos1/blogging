import { BlogRepository } from "@/repositories/typeorm/blog.repository"
import { FindAllByAdminUseCase } from "../find-all-by-admin"

export function makeFindAllByAdminUseCase() {
    const blogRepository = new BlogRepository()

    const findAllByAdminUseCase = new FindAllByAdminUseCase(blogRepository)

    return findAllByAdminUseCase
}