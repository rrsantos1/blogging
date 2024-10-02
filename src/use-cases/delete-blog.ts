import { IBlogRepository } from "@/repositories/blog.repository.interface";

export class DeleteBlogUseCase {
  constructor(private blogRepository: IBlogRepository) {}

  async handler(id: number): Promise<void> {
    return this.blogRepository.delete(id);
  }
}