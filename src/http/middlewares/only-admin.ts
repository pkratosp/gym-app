import { FastifyReply, FastifyRequest } from 'fastify'

export function onlyAdmin(role: 'ADMIN' | 'MEMBER') {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const { role  } = request.user
    
        if(role !== 'ADMIN') {
            return reply.status(401).send({ message: 'Unauthorized.' })
        }
    }
    
}