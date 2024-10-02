import { BlogRepository } from "@/repositories/typeorm/blog.repository";
import { FindByKeyWordUseCase } from "../find-by-key-word";

export function makeFindByKeyWordUseCase() {
    const blogRepository = new BlogRepository();
    const findByKeyWordUseCase = new FindByKeyWordUseCase(blogRepository);
    return findByKeyWordUseCase;
}