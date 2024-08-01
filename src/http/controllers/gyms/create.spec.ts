import request from 'supertest'
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAutenticateUser } from '@/utils/test/create-and-autenticate-user';

describe('create gym e2e', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create gym', async () => {
        const { token } = await createAndAutenticateUser(app, true)

        const createGym = await request(app.server)
        .post('/gyms')
        .send({
            title: 'JavaScript Gym',
            description: 'Some description.',
            phone: '1199999999',
            latitude: -27.2092052,
            longitude: -49.6401091,
        })
        .set('Authorization', `Bearer ${token}`)

        expect(createGym.status).toEqual(201)
    })

})