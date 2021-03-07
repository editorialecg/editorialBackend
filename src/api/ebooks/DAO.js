const ebookFrontModel = require('../../models/ebookfrontModel')
const ebookPdfModel = require('../../models/ebookPdf')

module.exports = {

    async getAllEbook() {
        return new Promise((resolve, reject) => ebookFrontModel.find({}, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        }))
    },

    async findEbookFrontById(id) {
        return new Promise((resolve, reject) => ebookFrontModel.findOne({ _id: id }, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        }))
    },

    async findEbookPdfById(id) {
        return new Promise((resolve, reject) => ebookPdfModel.find({ _id: id }, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        }))
    },

    async findEbookPdfByName(name) {
        return new Promise((resolve, reject) => ebookPdfModel.findOne({ name: name }, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        }))
    },

    async createEbookPdf(name, path) {
        return new Promise((resolve, reject) => ebookPdfModel.create({ name: name, path: path }, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        }))
    },

    async updateEbookPdf(name, path) {
        return new Promise((resolve, reject) => ebookPdfModel.findOneAndUpdate(name, path, { new: true }, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        }))
    },

    async createEbookFront(name, subTitle, path, pages, published, language, author, authorBio, copyReader,
        copyReaderBio, illustrator, illustratorBio, edition, gender, description, btnPayPal, legalDepo,
        isbn, editor, editorBio, price) {
        return new Promise((resolve, reject) => ebookFrontModel.create({
            name: name,
            subTitle: subTitle,
            path: path,
            pages: pages,
            published: published,
            language: language,
            author: author,
            authorBio: authorBio,
            copyReader: copyReader,
            copyReaderBio: copyReaderBio,
            illustrator: illustrator,
            illustratorBio: illustratorBio,
            edition: edition,
            gender: gender,
            description: description,
            btnPayPal: btnPayPal,
            legalDepo: legalDepo,
            isbn: isbn,
            editor: editor,
            editorBio: editorBio,
            price: price
        }, (err,data) =>{
            if(err) return reject(err)
            resolve(data)
        }))
    }

}