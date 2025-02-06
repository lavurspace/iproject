const request = require('supertest')
const app = require('../app')

const { hashPassword } = require('../helpers/bcrypt')
const { sequelize } = require('../models')
const queryInterface = sequelize.getQueryInterface()
const { signToken, verifyToken } = require('../helpers/jwt')

let users = require('../data/users.json')
let products = require('../data/products.json')
let wishlists = require('../data/wishlists.json')

let token;
beforeAll(async () => {
    users.forEach(user => {
        delete user.id
        user.password = hashPassword(user.password)
        user.createdAt = new Date()
        user.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Users', users, {})

    const userLogin = {
        userId: '1',
        name: 'John Doe',
        email: 'john@example.com'
    }

    token = signToken(userLogin)

    products.forEach(product => {
        delete product.id
        product.createdAt = new Date()
        product.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Products', products, {})
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true })
    await queryInterface.bulkDelete('Products', null, { truncate: true, cascade: true, restartIdentity: true })
    await queryInterface.bulkDelete('Wishlists', null, { truncate: true, cascade: true, restartIdentity: true })
})

describe('Wishlist', () => {
    it('should create a wishlist', async () => {
        const response = await request(app)
            .post('/wishlists')
            .set('Authorization', `Bearer ${token}`)
            .send({ productId: 1 })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message', 'Add to wishlist success')
    })
    it('should throw an error because user not login', async () => {
        const response = await request(app)
            .post('/wishlists')
            .send({ productId: 1 })

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message', 'Invalid token or unauthorized access')
    })
    it('should be return error because data is not found', async () => {
        const response = await request(app)
            .post('/wishlists')
            .set('Authorization', `Bearer ${token}`)
            .send({ productId: 200 })

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message', 'Data is not found')
    })


    it('should be return data of wishlist', async () => {
        const response = await request(app)
            .get('/wishlists')
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('wishlists')

    })
    it('should be return error because user not login', async () => {
        const response = await request(app)
            .get('/wishlists')
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message', 'Invalid token or unauthorized access')
    })

    it('should be delete wishlist', async () => {
        const response = await request(app)
            .delete('/wishlists/1')
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message', 'Wishlist deleted')
    })
    it('should return error because user not login', async () => {
        const response = await request(app)
            .delete('/wishlists/1')

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message', 'Invalid token or unauthorized access')
    })
    it('should return error because data is not found', async () => {
        const response = await request(app)
            .delete('/wishlists/100')
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message', 'Data is not found')
    })
})