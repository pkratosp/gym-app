import request from 'supertest'
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAutenticateUser } from '@/utils/test/create-and-autenticate-user';

describe('profile e2e', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get profile', async () => {
        const { token } = await createAndAutenticateUser(app)

        const profile = await request(app.server).get('/me').set('Authorization', `Bearer ${token}`)

        expect(profile.status).toEqual(200)
        expect(profile.body.user).toEqual(expect.objectContaining({
            email: 'jhondoe@gmail.com'
        }))

    })

})