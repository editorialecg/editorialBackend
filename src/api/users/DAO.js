const userModel = require('../../models/user');

module.exports = {

    async findOneUser(userName) {
        return new Promise((resolve, reject) => userModel.findOne({ userName: userName }, (err, data) => {
            if (err) return reject(err);
            resolve(data)
        }))
    },

    async findByEmail(email) {
        return new Promise((resolve, reject) => userModel.findOne({ email: email }, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        }))
    },

    async createUser(name, lastName, email, verifyEmail, codeVerify, userName, password, country, birthDay, birthMonth, birthYear) {
        return new Promise((resolve, reject) => userModel.create({
            name: name,
            lastName: lastName,
            email: email,
            verifyEmail: verifyEmail,
            codeVerify: codeVerify,
            userName: userName,
            password: password,
            country: country,
            birthDateDay: birthDay,
            birthDateMonth: birthMonth,
            birthDateYear: birthYear
        }, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        }))
    },

    async confirmEmail(username, verifyEmail) {
        return new Promise((resolve, reject) => userModel.findOneAndUpdate({ userName: username }, { verifyEmail: verifyEmail }, { new: true }, (err, data) => {
            if (err) return reject(err);
            resolve(data)
        }))
    },

    async changePassword(userName, password) {
        return new Promise((resolve, reject) => userModel.findOneAndUpdate({ userName: userName }, { password: password }, { new: true }, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        }))
    },

    async changeName(userName, name) {
        return new Promise((resolve, reject) => userModel.findOneAndUpdate({ userName: userName }, { name: name }, { new: true }, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        }))
    },

    async changelastName(userName, lastName) {
        return new Promise((resolve, reject) => userModel.findOneAndUpdate({ userName: userName }, { lastName: lastName }, { new: true }, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        }))
    },

    async changeUsername(findUsername, userName) {
        return new Promise((resolve, reject) => userModel.findOneAndUpdate({ userName: findUsername }, { userName: userName }, { new: true }, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        }))
    },

    async changeEmail(userName, email) {
        return new Promise((resolve, reject) => userModel.findOneAndUpdate({ userName: userName }, { email: email }, { new: true }, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        }))
    },

    async updateEbookFront(username, update) {
        return new Promise((resolve, reject) => userModel.findOneAndUpdate({ userName: username }, update, { new: true }, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        }))
    }
}