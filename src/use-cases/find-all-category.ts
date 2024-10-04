import { ICategoryRepository } from "@/repositories/category.repository.interface";

export class FindAllCategoryUseCase {
    constructor(private categoryRepository: ICategoryRepository) {}

    async handler(page: number, limit: number) {
        return this.categoryRepository.findAllCategory(page, limit)
    }
}