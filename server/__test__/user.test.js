const request = require('supertest')
const app = require('../app')
const { hashPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { sequelize } = require('../models')
const cloudinary = require('cloudinary').v2
const queryInterface = sequelize.getQueryInterface()

let users = require('../data/users.json')


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
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true })
})

jest.spyOn(cloudinary.uploader, 'upload').mockResolvedValue({
    secure_url: 'https://res.cloudinary.com/demo/image/upload/v12345/sample.jpg'
});

describe('User Controller', () => {
    describe('POST /register', () => {
        it('should success register a new user', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    name: 'Saraswati',
                    email: 'sarah1@mail.com',
                    password: '123456',
                    imgUrl: 'https://example.com/sarah.jpg',
                })

            expect(res.status).toBe(201)
            expect(res.body.message).toBe('Success added new account')
        })
        it('should return error because of validation failed register a new user', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    name: '',
                    email: 'sarah1@mail.com',
                    password: '123456',
                    imgUrl: 'https://example.com/sarah.jpg',
                })

            expect(res.status).toBe(400)
            expect(res.body.message).toBe('Name cannot be empty')
        })
        it('should return error because of validation failed register a new user', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    name: 'Saraswati',
                    email: '',
                    password: '123456',
                    imgUrl: 'https://example.com/sarah.jpg',
                })

            expect(res.status).toBe(400)
            expect(res.body.message).toBe('Email cannot be empty')
        })
        it('should return error because of validation failed register a new user', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    name: 'Saraswati',
                    email: 'sarah1@mail.com',
                    password: '',
                    imgUrl: 'https://example.com/sarah.jpg',
                })

            expect(res.status).toBe(400)
            expect(res.body.message).toBe('Password cannot be empty')
        })
    })

    describe('POST /login', () => {
        it('should success login with valid credentials', async () => {
            const res = await request(app)
                .post('/login')
                .send({
                    email: 'sarah1@mail.com',
                    password: '123456',
                })

            expect(res.status).toBe(200)
            expect(res.body.message).toBe('Login successful')
        })
        it('should return error because of validation failed login', async () => {
            const res = await request(app)
                .post('/login')
                .send({
                    email: 'sarah1@mail.com',
                    password: '',
                })

            expect(res.status).toBe(401)
            expect(res.body.message).toBe('Invalid email or password')
        })
        it('should return error because of validation failed login', async () => {
            const res = await request(app)
                .post('/login')
                .send({
                    email: '',
                    password: '123456',
                })

            expect(res.status).toBe(401)
            expect(res.body.message).toBe('Invalid email or password')
        })
    })

    describe('GET /profile', () => {
        it('should return user profile', async () => {
            const res = await request(app)
                .get('/profile')
                .set('Authorization', `Bearer ${token}`)

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('user')
        })
        it('should return error because user not login', async () => {
            const res = await request(app)
                .get('/profile')

            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('message', 'Invalid token or unauthorized access')
        })
    })

    describe('PATCH /profile/image', () => {
        afterAll(() => {
            jest.restoreAllMocks();
        });

        describe('PATCH /profile/image - success', () => {
            it('should return the photo URL that was uploaded to Cloudinary', async () => {
                const response = await request(app)
                    .patch(`/profile/image`)
                    .set('Authorization', `Bearer ${token}`)
                    .attach('imgUrl', Buffer.from('sample-image-data'), 'test-image.jpg');

                expect(response.status).toBe(201);
                expect(response.body).toHaveProperty('message', `Profile updated`);
                expect(response.body).toHaveProperty('imgUrl', 'https://res.cloudinary.com/demo/image/upload/v12345/sample.jpg');
                expect(cloudinary.uploader.upload).toHaveBeenCalled();
            });
        });
        it('should return 401 because user not login', async () => {
            const response = await request(app)
                .patch(`/profile/image`)
                .attach('imgUrl', Buffer.from('sample-image-data'), 'test-image.jpg');

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('message', `Invalid token or unauthorized access`);
            expect(cloudinary.uploader.upload).toHaveBeenCalled();
        });
    });
})