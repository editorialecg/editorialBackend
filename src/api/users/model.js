const userDao = require('./DAO')

module.exports = {

    async findOneUser(userName) {
        return await userDao.findOneUser(userName)
    },

    async findByEmail(email) {
        return await userDao.findByEmail(email)
    },

    async createUser(name, lastName, email, verifyEmail, codeVerify, userName, password, country, birthDay, birthMonth, birthYear) {
        return await userDao.createUser(name, lastName, email, verifyEmail, codeVerify, userName, password, country, birthDay, birthMonth, birthYear)
    },

    async confirmEmail(username, verifyEmail) {
        return await userDao.confirmEmail(username, verifyEmail)
    },

    async changePassword(userName, password) {
        return await userDao.changePassword(userName, password)
    },

    async changeName(userName, name) {
        return await userDao.changeName(userName, name)
    },

    async changelastName(userName, lastName) {
        return await userDao.changelastName(userName, lastName)
    },

    async changeEmail(userName, email) {
        return await userDao.changeEmail(userName, email)
    },

    async changeUsername(findUsername, userName) {
        return await userDao.changeUsername(findUsername, userName)
    },

    async updateEbookFront(username, update) {
        return await userDao.updateEbookFront(username, update)
    }
}