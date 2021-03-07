module.exports = {

    async sendLoginUser(id, userName, email, verifyEmail, token) {
        const data = {
            id: id,
            username: userName,
            email: email,
            verifyEmail: verifyEmail,
            accessToken: token,
        }

        return data
    },

    async sendCreateUser(id, name, userName, email, country, verifyEmail, token) {
        const dataUser = {
            id: id,
            username: userName,
            name: name,
            accessToken: token,
            verifyEmail: verifyEmail
        }

        return dataUser
    },

    async sendConfigUser(name, lastName, email, userName) {
        const data = {
            name: name,
            lastName: lastName,
            email: email,
            userName: userName
        }
        return data
    },

    async sendOneUser(name, lastName, email, ebookAcess, userName, country, birthDay, birthMonth, birthYear) {
        const data = {
            name: name,
            lastName: lastName,
            email: email,
            ebookAcess: ebookAcess,
            userName: userName,
            country: country,
            birthDateDay: birthDay,
            birthDateMonth: birthMonth,
            birthDateYear: birthYear
        }

        return data
    },

    async sendConfirmEmail(id, userName, verifyEmail, token) {
        const dataUser ={
            id: id,
            userName: userName,
            verifyEmail: verifyEmail,
            accessToken: token
        }

        return dataUser
    },

    async sendUpdateUsername(username){
        const data = {
            userName: username
        }
        return data
    },

    async sendConfirmUser(id,username,verifyEmail){
        const data = {
            id: id,
            userName: username,
            verifyEmail: verifyEmail
        }

        return data
    }

}