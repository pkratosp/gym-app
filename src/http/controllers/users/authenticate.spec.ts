import request from 'supertest'
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe('autenticate e2e', () => {
    beforeAll(async() => {
        await app.ready()
    })

    afterAll(async() => {
        await app.close()
    })

    it('should be able to autenticate', async() => {
        const response = await request(app.server)
            .post('/users')
            .send({
                name: 'jhon doe',
                email: 'jhondoe@gmail.com',
                password: '123456'
            })


        const autenticate = await request(app.server).post('/sessions').send({
            email: 'jhondoe@gmail.com',
                password: '123456'
        })

        expect(autenticate.status).toEqual(200)
        expect(autenticate.body).toEqual({
            token: expect.any(String)
        })
    })
})