import request from 'supertest'
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAutenticateUser } from '@/utils/test/create-and-autenticate-user';
import { prisma } from '@/lib/prisma';

describe('validate checkin e2e', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to validate checkin', async () => {
        const { token } = await createAndAutenticateUser(app, true)

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

        
        const checkin = await prisma.checkIn.create({
            data: {
                gym_id: createGym.id,
                user_id: user.id,
            }
          })

        const response = await request(app.server)
            .patch(`/check-ins/${checkin.id}/validate`)
            .set('Authorization', `Bearer ${token}`)
        
        expect(response.status).toEqual(204)
    })

})