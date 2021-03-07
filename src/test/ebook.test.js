const request = require('supertest')
const app = require('../app')

describe('Test GET /ebook/allebookfront', () => {
    test('It should respond with code 200', async (done) => {
        const response = await request(app)
            .get('/ebook/allebookfront')
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
        done()
    })
})

describe('Test GET /ebook/oneebook/:id', () => {
    test('It should respond with code 200', async (done) => {
        const response = await request(app)
            .get('/ebook/oneebook/60341774a5fda704f0452b69')
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeDefined()
        done()
    })

    test('It should respond with code 404', async (done) => {
        const response = await request(app)
            .get('/ebook/oneebook/6034169ca5fda704f0452b64')
        expect(response.statusCode).toBe(404)
        done()
    })
})

describe('Test PUT /ebook/ebookpayed/:username/:front/:idPdf', () => {
    test('It should respond with code 200', async done => {
        const response = await request(app)
            .put('/ebook/ebookpayed/doblejmf/6034169ca5fda704f0452b68/603428d4fb28a11d64eba3ae')
        expect(response.statusCode).toBe(200)
        done()
    })

    test('It should respond with code 404', async (done) => {
        const response = await request(app)
            .put('/ebook/ebookpayed/noexiste/60341774a5fda704f0452b69/60412ff5dfd30f76d4a025c1')
        expect(response.statusCode).toBe(404)
        done()
    })
})

describe('Test GET /ebook/myebook/:username', () => {

    test('It should respond with code 200', async (done) => {
        const response = await request(app)
            .get('/ebook/myebook/doblejmf')

        expect(response.statusCode).toBe(200)
        done()
    })

    test('It should respond with code 404 ebook', async (done) => {
        const response = await request(app)
            .get('/ebook/myebook/mmortizramos')
        expect(response.statusCode).toBe(404)
        done()
    })
})

describe('Test POST /ebook/createebookfront', () => {
    test('It should respond with code 200', async (done) => {
        const response = await request(app)
            .post('/ebook/createebookfront')
            .send({
                name: 'Test',
                subTitle: 'SubTest',
                path: 'Alguna',
                pages: 'Muchas',
                published: 'Algun dia',
                language: 'El que quieras',
                author: 'tu',
                authorBio: 'Tu',
                copyReader: 'Alguien',
                copyReaderBio: 'AlguienBio',
                illustrator: 'ALguien mas',
                illustratorBio: 'Alguien mas bio',
                edition: 'Cualquiera',
                gender: 'Cualsea',
                description: 'Descripcion',
                btnPayPal: 'Boton',
                legalDepo: 'alguno',
                isbn: 'isbn',
                editor: 'alguin',
                editorBio: 'alguien',
                price: '$$$$'
            })
        expect(response.statusCode).toBe(200)
        done()
    })
})

describe('Test POST /ebook/createebookpdf', () => {
    test('It should respond with code 200', async (done) => {
        const response = await request(app)
            .post('/ebook/createebookpdf')
            .send({
                name: 'El libro',
                path: 'La ruta'
            })
        expect(response.statusCode).toBe(200)
        done()
    })

    test('It should respond with code 200', async (done) => {
        const response = await request(app)
            .post('/ebook/createebookpdf')
            .send({
                name: 'El libro',
                path: 'La ruta 2 '
            })
        expect(response.statusCode).toBe(201)
        done()
    })
})

describe('Test GET /ebook/viewmypdf/:username/:id', () => {
    test('It should respond with code 200', async (done) =>{
        const response = await request(app)
            .get('/ebook/viewmypdf/doblejmf/603428d4fb28a11d64eba3ae')

        expect(response.statusCode).toBe(200)
        done()
    })

    test('It should respond with code 404', async (done) =>{
        const response = await request(app)
            .get('/ebook/viewmypdf/')

        expect(response.statusCode).toBe(404)
        done()
    })
})