import { ICategory } from "@/entities/models/category.interface";

export interface ICategoryRepository {
    create(category: ICategory): Promise<ICategory>
    findAllCategory(page: number, limit: number): Promise<ICategory[] | undefined>
}