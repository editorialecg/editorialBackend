import userModel from '../../models/user';

export async function findOneUserDao(userName) {
    return new Promise((resolve, reject) => userModel.findOne({ username: userName }, (err, data) => {
        if (err)
            return reject(err);
        resolve(data);
    }));
}
export async function findByEmailDao(email) {
    return new Promise((resolve, reject) => userModel.findOne({ email: email }, (err, data) => {
        if (err)
            return reject(err);
        resolve(data);
    }));
}
export async function createUserDao(name, lastName, email, verifyEmail, codeVerify, userName, password, country, birthDay, birthMonth, birthYear) {
    return new Promise((resolve, reject) => userModel.create({
        name: name,
        lastname: lastName,
        email: email,
        verifyEmail: verifyEmail,
        codeVerify: codeVerify,
        username: userName,
        password: password,
        country: country,
        birthDay: birthDay,
        birthMonth: birthMonth,
        birthYear: birthYear
    }, (err, data) => {
        if (err) return reject(err);
        resolve(data);
    }));
}
export async function confirmEmailDao(username, verifyEmail) {
    return new Promise((resolve, reject) => userModel.findOneAndUpdate({ username: username }, { verifyEmail: verifyEmail }, { new: true }, (err, data) => {
        if (err) return reject(err);
        resolve(data);
    }));
}
export async function changePasswordDao(userName, password) {
    return new Promise((resolve, reject) => userModel.findOneAndUpdate({ username: userName }, { password: password }, { new: true }, (err, data) => {
        if (err) return reject(err);
        resolve(data);
    }));
}
export async function changeNameDao(userName, name) {
    return new Promise((resolve, reject) => userModel.findOneAndUpdate({ username: userName }, { name: name }, { new: true }, (err, data) => {
        if (err) return reject(err);
        resolve(data);
    }));
}
export async function changelastNameDao(userName, lastName) {
    return new Promise((resolve, reject) => userModel.findOneAndUpdate({ username: userName }, { lastname: lastName }, { new: true }, (err, data) => {
        if (err) return reject(err);
        resolve(data);
    }));
}
export async function changeUsernameDao(findUsername, userName) {
    return new Promise((resolve, reject) => userModel.findOneAndUpdate({ username: findUsername }, { username: userName }, { new: true }, (err, data) => {
        if (err)
            return reject(err);
        resolve(data);
    }));
}
export async function changeEmailDao(userName, email) {
    return new Promise((resolve, reject) => userModel.findOneAndUpdate({ username: userName }, { email: email }, { new: true }, (err, data) => {
        if (err)
            return reject(err);
        resolve(data);
    }));
}

export async function updateUserDao(userName, data){
    return new Promise((resolve, reject) => userModel.findOneAndUpdate({ username: userName }, data, { new: true }, (err, data) => {
        if (err) return reject(err);
        resolve(data);
    }));
}

export async function updateEbookFrontDao(username, update) {
    return new Promise((resolve, reject) => userModel.findOneAndUpdate({ username: username }, update, { new: true }, (err, data) => {
        if (err) return reject(err);
        resolve(data);
    }));
}