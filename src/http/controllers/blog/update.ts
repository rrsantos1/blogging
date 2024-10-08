
import { Category } from "@/entities/category.entity";
import { Person } from "@/entities/person.entity";
import { appDataSource } from "@/lib/typeorm/typeorm";
import { makeUpdateBlogUseCase } from "@/use-cases/factory/make-update-blog-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(
    request: FastifyRequest, 
    reply: FastifyReply
){
    const registerParamsSchema = z.object({
        id: z.coerce.number()
    })

    const { id } = registerParamsSchema.parse(request.params)

    const registerBodySchema = z.object({
        title: z.string(),
        description: z.string(),
        person_id: z.coerce.number(),
        category_id: z.coerce.number(),
        update_date: z.coerce.date()
    })

    const { title, description, person_id, category_id, update_date } = registerBodySchema.parse(request.body)

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

    const updateBlogUseCase = makeUpdateBlogUseCase()
    
    const blog = await updateBlogUseCase.handler({
        id,
        title,
        description,
        person,
        category,
        update_date
    })

    return reply.status(200).send(blog)
}