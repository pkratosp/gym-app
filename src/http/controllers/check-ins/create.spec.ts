import request from 'supertest'
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAutenticateUser } from '@/utils/test/create-and-autenticate-user';
import { prisma } from '@/lib/prisma';

describe('create checkin e2e', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create check in', async () => {
        const { token } = await createAndAutenticateUser(app)

        const createGym = await prisma.gym.create({
            data: {
                title: 'JavaScript Gym',
                description: 'Some description.',
                phone: '1199999999',
                latitude: -27.2092052,
                longitude: -49.6401091,
            }
        })

        
        const response = await request(app.server)
            .post(`/gyms/${createGym.id}/check-ins`)
            .send({
                latitude: -27.2092052,
                longitude: -49.6401091,
            })
            .set('Authorization', `Bearer ${token}`)
        
        expect(response.status).toEqual(201)
    })

})