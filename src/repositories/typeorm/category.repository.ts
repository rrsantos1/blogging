import { Category } from "@/entities/category.entity"
import { ICategory } from "@/entities/models/category.interface"
import { appDataSource } from "@/lib/typeorm/typeorm"
import { Repository } from "typeorm"
import { ICategoryRepository } from "../category.repository.interface"

export class CategoryRepository implements ICategoryRepository {
    private repository: Repository<Category>

    constructor() {
        this.repository = appDataSource.getRepository(Category)
    }

    create(category: ICategory): Promise<ICategory> {
        return this.repository.save(category)
    }
}