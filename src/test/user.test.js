const request = require('supertest');
const app = require('../app')

describe('Test POST /user/createuser', () => {
    test('It should respond with code 200', async (done) => {
        const response = await request(app)
            .post('/user/createuser')
            .send({
                name: 'Test',
                lastName: 'lastTest',
                email: 'alisolorzano0001@gmail.com',
                userName: 'Test',
                password: '12345678',
                country: 'VE',
                birthDateDay: '19',
                birthDateMonth: 'jul',
                birthDateYear: '2001'

            })
        expect(response.statusCode).toBe(200)
        expect(response.statusCode).not.toBeUndefined()
        done()
    })

    test('It should respond with code 400', async (done) => {
        const response = await request(app)
            .post('/user/createuser')
            .send({
                name: undefined,
                lastName: 'lastTest',
                email: 'alisolorzano0001@gmail.com',
                userName: 'Test',
                password: '12345678',
                country: 'VE',
            })
        expect(response.statusCode).toBe(400)
        done()
    })

    test('It should respond with code 401', async (done) => {
        const response = await request(app)
            .post('/user/createuser')
            .send({
                name: 'Test',
                lastName: 'lastTest',
                email: 'alisolorzano0001@gmail.com',
                userName: 'Test',
                password: '12345678',
                country: 'VE',
                birthDateDay: '19',
                birthDateMonth: 'jul',
                birthDateYear: '2001'

            })
        expect(response.statusCode).toBe(401)
        expect(response.statusCode).not.toBeUndefined()
        done()
    })
})

describe('Test GET /user/oneuser/:username', () => {
    test('It should respond with code 200', async (done) => {
        const response = await request(app)
            .get('/user/oneuser/Test')
        expect(response.statusCode).toBe(200)
        expect(response.body).not.toBeUndefined()
        done()
    })

    test('It should respond with code 404 ', async (done) => {
        const response = await request(app)
            .get('/user/oneuser/NOTEXIST')
        expect(response.statusCode).toBe(404)
        done()
    })

})

describe('Test POST /user/confirmemail/:username', () => {
    test('It should respond with code 200', async (done) => {
        const response = await request(app)
            .post('/user/confirmemail/Test')
            .send({
                code: '123456789'
            })
        expect(response.statusCode).toBe(200)
        done()
    })

    test('It should respond with 400', async done => {
        const response = await request(app)
            .post('/user/confirmemail/Test')
            .send({

            })
        expect(response.statusCode).toBe(400)
        done()
    })

    test('It should respond with code 401', async done => {
        const response = await request(app)
            .post('/user/confirmemail/Test')
            .send({
                code: '123456'
            })
        expect(response.statusCode).toBe(401)
        done()
    })
})

describe('Test POST /user/confirmpassword/:username', () => {
    test('It should respond with code 200', async (done) => {
        const response = await request(app)
            .post('/user/confirmpassword/Test')
            .send({
                password: '12345678'
            });
        expect(response.statusCode).toBe(200);
        done()
    })

    test('It should respond with code 400', async (done) => {
        const response = await request(app)
            .post('/user/confirmpassword/Test')
            .send({

            })
        expect(response.statusCode).toBe(400)
        done()
    })

    test('It should respond with code 404', async done => {
        const response = await request(app)
            .post('/user/confirmpassword/Testhoh')
            .send({
                password: '12345678'
            })
        expect(response.statusCode).toBe(404)
        done()
    })
})

describe('Test POST /user/changepassword/:username', () => {
    test('It should respond with code 200', async (done) => {
        const response = await request(app)
            .put('/user/changepassword/Test')
            .send({
                password: '123456789'
            })
        expect(response.statusCode).toBe(200)
        done()
    })

    test('It should respond with code 400', async (done) => {
        const response = await request(app)
            .put('/user/changepassword/Test')
            .send({

            })
        expect(response.statusCode).toBe(400)
        done()
    })

    test('It should respond with code 404', async (done) => {
        const response = await request(app)
            .put('/user/changepassword/NOTEXIST')
            .send({
                password: '123456789test'
            })
        expect(response.statusCode).toBe(404)
        done()
    })

})

describe('Test POST /user/updateuser/:username', () => {
    test('It should respond with code 200 for changing the name', async (done) => {
        const response = await request(app)
            .put('/user/updateuser/Test')
            .send({
                name: 'Solo Name'
            })
        expect(response.statusCode).toBe(200)
        done()
    })

    test('It should respond with code 200 for changing the lastName', async (done) => {
        const response = await request(app)
            .put('/user/updateuser/Test')
            .send({
                lastName: 'Solo lastName'
            })
        expect(response.statusCode).toBe(200)
        done()
    })

    test('It should respond with code 200 for changing the email', async (done) => {
        const response = await request(app)
            .put('/user/updateuser/Test')
            .send({
                email: 'otro@gmail.com'
            })
        expect(response.statusCode).toBe(200)
        done()
    })

    test('It should respond with code 200 for changing the userName', async (done) => {
        const response = await request(app)
            .put('/user/updateuser/Test')
            .send({
                userName: 'Otro'
            })
        expect(response.statusCode).toBe(200)
        done()
    })

})

describe("Test POST /user/loginuser", () => {

    test('It should respond with code 400', async (done) => {
        const response = await request(app)
            .post('/user/loginuser')
            .send({
                userName: 'Test',
                password: null
            })
        expect(response.statusCode).toBe(400)
        done()
    })

    test('It should respond with code 401', async (done) => {
        const response = await request(app)
            .post('/user/loginuser')
            .send({
                userName: 'Otro',
                password: '123456789gsagnisagnoisdbg'
            })
        expect(response.statusCode).toBe(401)
        done()
    })

    test('It should respond with code 404', async (done) => {
        const response = await request(app)
            .post('/user/loginuser')
            .send({
                userName: 'Not exist',
                password: '123456789test'
            })
        expect(response.statusCode).toBe(404)
        expect(response.text).toBe('User not found')
        done()
    })

    test('It should respond with code 200', async (done) => {
        const response = await request(app)
            .post('/user/loginuser')
            .send({
                userName: 'Otro',
                password: '123456789'
            })
        expect(response.statusCode).toBe(200)
        done()
    })

})

describe('Test GET /user/configuser/:username', () => {
    test('It should respond with code 200', async (done) => {
        const response = await request(app)
            .get('/user/configuser/Otro')
        expect(response.statusCode).toBe(200)
        expect(response.body).not.toBeUndefined()
        done()
    })
})