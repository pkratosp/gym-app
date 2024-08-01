import request from 'supertest'
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAutenticateUser } from '@/utils/test/create-and-autenticate-user';

describe('search gym e2e', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to search gym', async () => {
        const { token } = await createAndAutenticateUser(app, true)


        await Promise.all([
            await request(app.server)
                .post('/gyms')
                .send({
                    title: 'typescript Gym',
                    description: 'Some description.',
                    phone: '1199999999',
                    latitude: -27.2092052,
                    longitude: -49.6401091,
                })
                .set('Authorization', `Bearer ${token}`),
            await request(app.server)
                .post('/gyms')
                .send({
                    title: 'JavaScript Gym',
                    description: 'Some description.',
                    phone: '1199999999',
                    latitude: -27.2092052,
                    longitude: -49.6401091,
                })
                .set('Authorization', `Bearer ${token}`)
        ])

        
        const response = await request(app.server).get('/gyms/search')
            .query({
                q: 'JavaScript'
            })
            .set('Authorization', `Bearer ${token}`)
        

        expect(response.status).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'JavaScript Gym',
            })
        ])
    })

})