import { BlogRepository } from "@/repositories/typeorm/blog.repository";
import { FindBlogUseCase } from "../find-blog";

export function makeFindBlogUseCase() {
    const blogRepository = new BlogRepository();
    const findBlogUseCase = new FindBlogUseCase(blogRepository);
    return findBlogUseCase;
}