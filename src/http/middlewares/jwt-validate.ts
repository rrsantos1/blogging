import { FastifyReply, FastifyRequest } from "fastify";

export async function validateJwt(
    request: FastifyRequest, 
    reply: FastifyReply
) {
  try {
    const routeFreeList = ['POST-/person', 'POST-/person/signin'];
    const adminRoutePatterns = [
      /^POST-\/posts$/,
      /^GET-\/posts\/admin$/,
      /^PUT-\/posts\/\d+$/,
      /^DELETE-\/posts\/\d+$/
    ];
    
    const validateRoute = `${request.method}-${request.url}`;

    if (routeFreeList.includes(validateRoute)) return;

    await request.jwtVerify();

    const { perfil } = request.user as { perfil: string };

    // Verifica se a rota acessada corresponde a alguma rota de admin
    const isAdminRoute = adminRoutePatterns.some(pattern => pattern.test(validateRoute));

    if (isAdminRoute && perfil !== 'admin') {
      return reply.status(403).send({ message: 'Access denied' });
    }

  } catch (error) {
    reply.status(401).send({ message: 'Unauthorized' });
  }
}