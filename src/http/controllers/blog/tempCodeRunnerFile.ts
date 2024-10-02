const registerParamsSchema = z.object({
        page: z.coerce.number(),
        limit: z.coerce.number()
    })