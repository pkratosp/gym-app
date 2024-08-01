import { app } from '@/app';
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe('register e2e', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register', async () => {
        const response = await request(app.server)
            .post('/users')
            .send({
                name: 'jhon doe',
                email: 'jhondoe@gmail.com',
                password: '123456'
            })

        expect(response.status).toEqual(201)
    })
})