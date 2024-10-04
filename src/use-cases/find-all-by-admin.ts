import { IBlogRepository } from "@/repositories/blog.repository.interface";

export class FindAllByAdminUseCase {
    constructor(private blogRepository: IBlogRepository) {}

    async handler(personId: number, page: number, limit: number) {
        return this.blogRepository.findAllByAdmin(personId, page, limit)
    }
}