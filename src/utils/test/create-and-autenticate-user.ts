import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAutenticateUser(app: FastifyInstance, isAdmin = false) {

    const password_hash = await hash('123456',6)
    await prisma.user.create({
        data: {
            name: 'jhon doe',
            email: 'jhondoe@gmail.com',
            password_hash: password_hash,
            role: isAdmin === true ? 'ADMIN' : 'MEMBER'
        }
    })

    const autenticate = await request(app.server).post('/sessions').send({
        email: 'jhondoe@gmail.com',
            password: '123456'
    })

    const { token } = autenticate.body

    return {
        token
    }
}