import request from 'supertest'
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAutenticateUser } from '@/utils/test/create-and-autenticate-user';
import { prisma } from '@/lib/prisma';

describe('metrics checkin e2e', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get metrics', async () => {
        const { token } = await createAndAutenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const createGym = await prisma.gym.create({
            data: {
                title: 'JavaScript Gym',
                description: 'Some description.',
                phone: '1199999999',
                latitude: -27.2092052,
                longitude: -49.6401091,
            }
        })

        
        await prisma.checkIn.createMany({
            data: [
              {
                gym_id: createGym.id,
                user_id: user.id,
              },
              {
                gym_id: createGym.id,
                user_id: user.id,
              },
            ],
          })

        const response = await request(app.server)
            .get('/check-ins/metrics')
            .set('Authorization', `Bearer ${token}`)
        
        expect(response.status).toEqual(200)
        expect(response.body.checkInsCount).toEqual(2)
    })

})