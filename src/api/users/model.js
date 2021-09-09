import { findOneUserDao, findByEmailDao, createUserDao, confirmEmailDao, changePasswordDao, changeNameDao, changelastNameDao, changeEmailDao, changeUsernameDao, updateUserDao, updateEbookFrontDao } from './DAO'

export async function findOneUser(userName) {
    return await findOneUserDao(userName)
}
export async function findByEmail(email) {
    return await findByEmailDao(email)
}
export async function createUser(name, lastName, email, verifyEmail, codeVerify, userName, password, country, birthDay, birthMonth, birthYear) {
    return await createUserDao(name, lastName, email, verifyEmail, codeVerify, userName, password, country, birthDay, birthMonth, birthYear)
}
export async function confirmEmail(username, verifyEmail) {
    return await confirmEmailDao(username, verifyEmail)
}
export async function changePassword(userName, password) {
    return await changePasswordDao(userName, password)
}
export async function changeName(userName, name) {
    return await changeNameDao(userName, name)
}
export async function changelastName(userName, lastName) {
    return await changelastNameDao(userName, lastName)
}
export async function changeEmail(userName, email) {
    return await changeEmailDao(userName, email)
}
export async function changeUsername(findUsername, userName) {
    return await changeUsernameDao(findUsername, userName)
}
export async function updateUser(userName, data) {
    return await updateUserDao(userName, data)
}
export async function updateEbookFront(username, update) {
    return await updateEbookFrontDao(username, update)
}