import { BlogRepository } from "@/repositories/typeorm/blog.repository";
import { UpdateBlogUseCase } from "../update-blog";

export function makeUpdateBlogUseCase() {
    const blogRepository = new BlogRepository();
    const updateBlogUseCase = new UpdateBlogUseCase(blogRepository);
    return updateBlogUseCase;
}