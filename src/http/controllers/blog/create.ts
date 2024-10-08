import { appDataSource } from "@/lib/typeorm/typeorm"
import { Person } from "@/entities/person.entity";
import { Category } from "@/entities/category.entity";
import { makeCreateBlogUseCase } from "@/use-cases/factory/make-create-blog-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({           
        title: z.string(),
        description: z.string(),
        category_id: z.coerce.number(),
        creation_date: z.coerce.date(),
        update_date: z.coerce.date()
    })

    const { title, description, category_id, creation_date, update_date } = registerBodySchema.parse(request.body)

    // Recupera o person_id do token JWT
    const { person_id } = request.user as { person_id: number }
    
    // Buscando as entidades Person e Category
    const personRepository = appDataSource.getRepository(Person);
    const categoryRepository = appDataSource.getRepository(Category);

    // Verifica se a pessoa e a categoria existem
    const person = await personRepository.findOne({ where: { id: person_id } });
    if (!person) {
        return reply.code(400).send({ message: "Person not found" });
    }

    const category = await categoryRepository.findOne({ where: { id: category_id } });
    if (!category) {
        return reply.code(400).send({ message: "Category not found" });
    }

    // Chama o caso de uso passando os objetos Person e Category
    const CreateBlogUseCase = makeCreateBlogUseCase();
    
    await CreateBlogUseCase.handler({
        title,
        description,
        person,  // Passando a entidade Person
        category,  // Passando a entidade Category
        creation_date,
        update_date
    });

    return reply.code(201).send();
}