const ebookDao = require('./DAO')
const userModel = require('../users/model')
const ebookfrontModel = require('../../models/ebookfrontModel')


module.exports = {
    async getAllEbook() {
        return await ebookDao.getAllEbook()
    },

    async findEbookFrontById(id) {
        return await ebookDao.findEbookFrontById(id)
    },

    async findOneUser(userName) {
        return await userModel.findOneUser(userName)
    },

    async findEbookPdfById(id) {
        return await ebookDao.findEbookPdfById(id)
    },

    async updateEbookFront(username, update) {
        return await userModel.updateEbookFront(username, update)
    },

    async findEbookPdfByName(name) {
        return await ebookDao.findEbookPdfByName(name)
    },

    async createEbookPdf(name, path) {
        return await ebookDao.createEbookPdf(name, path)
    },

    async updateEbookPdf(name, path) {
        return await ebookDao.updateEbookPdf(name, path)
    },

    async createEbookFront(name, subTitle, path, pages, published, language, author, authorBio, copyReader,
        copyReaderBio, illustrator, illustratorBio, edition, gender, description, btnPayPal, legalDepo,
        isbn, editor, editorBio, price) {
        return await ebookDao.createEbookFront(name, subTitle, path, pages, published, language, author, authorBio, copyReader,
            copyReaderBio, illustrator, illustratorBio, edition, gender, description, btnPayPal, legalDepo,
            isbn, editor, editorBio, price)
    }
}