import { CategoryRepository } from "@/repositories/typeorm/category.repository"
import { FindAllCategoryUseCase } from "../find-all-category"

export function makeFindAllCategoryUseCase() {
    const categoryRepository = new CategoryRepository()

    const findAllCategoryUseCase = new FindAllCategoryUseCase(categoryRepository)

    return findAllCategoryUseCase
}