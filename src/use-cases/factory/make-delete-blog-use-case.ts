import { BlogRepository } from "@/repositories/typeorm/blog.repository";
import { DeleteBlogUseCase } from "../delete-blog";

export function makeDeleteBlogUseCase() {
    const blogRepository = new BlogRepository();
    const deleteBlogUseCase = new DeleteBlogUseCase(blogRepository);
    return deleteBlogUseCase;
}