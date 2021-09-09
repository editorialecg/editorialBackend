import {
	findOneUser, findByEmail, createUser, confirmEmail, changePassword, updateUser, updateEbookFront
} from '../api/users/model'

import { findEbookByTitle, getAllEbook, createEbookFront, updateEbookSelled } from '../api/ebooks/model'

import { comparePassword, encryptPassword, generateCode, sendEmail } from '../service/service'

export default {
	oneUser: async (parent, args, { User }) => {
		const { username } = parent

		if (!username) return null

		return await findOneUser(username)
	},

	oneEbook: async (parent, args, { Ebook }) => {
		const { title } = parent

		if (!title) return null

		const ebook =  await findEbookByTitle(title)

		return ebook
	},

	oneEbookPages: async (parent, args, { Ebook }) => {
		const { username, title } = parent

		const user = await findOneUser(username)
		const ebook = await findEbookByTitle(title)

		for (let i = 0; i < user.ebookAccess.length; i++) {
			var userLoop = user.ebookAccess[i];
			if(userLoop == ebook.title){
				return ebook
			}
		}

	},

	allEbook: async (parent, args, { Ebook }) => {
		let ebook = await getAllEbook()
		return ebook
	},

	myEbooks: async (parent, args, {Ebook}) =>{
		const { username } = parent

		const user = await findOneUser(username)

		
		return user

	},

	login: async (parent, args, { User }) => {
		const { username, password } = parent

		if (!username || !password) throw new Error({code: 400, message: 'Username or Password empty'}) 

		const user = await findOneUser(username)

		if (!user) throw new Error({code: 403, message: 'User not exist'})

		if (await comparePassword(password, user.password)) {

			return user

		} else {

			throw new Error({code: 401, message: 'Unauthorized'})

		}
	},

	createUser: async (parent, args, { User }) => {
		const { name, lastname, username, email, password, country, birthDay, birthMonth, birthYear } = parent

		if (!name || !lastname || !username || !email || !password || !country || !birthDay || !birthMonth || !birthYear) return null

		const user = await findOneUser(username)
		const userEmail = await findByEmail(email)

		if (user || userEmail) return null

		const hash = await encryptPassword(password)
		const code = await generateCode()

		const userCreated = await createUser(name, lastname, email, false, code, username, hash, country, birthDay, birthMonth, birthYear)

		await sendEmail(userCreated.email, code)

		return userCreated
	},

	confirmCode: async (parent, args, { User }) => {
		const { username, code } = parent

		if (!username || !code) return null

		const user = await findOneUser(username)

		if (!user) return null

		if (user.codeVerify == code) {
			const userU = await confirmEmail(username, true)

			return userU
		} else {
			return null
		}
	},

	confirmPassword: async (parent, args, { User }) => {
		const { username, password } = parent

		if (!username || !password) return null

		const user = await findOneUser(username);

		if (!user) return null

		if (await comparePassword(password, user.password)) return user

		return null
	},

	confirmUser: async (parent, args, { User }) => {
		const { username } = parent

		if (!username) return null

		const user = await findOneUser(username)

		if (!user) return null

		const code = await generateCode()
		const email = user.email

		await updateUser(username, {codeVerify: code})

		await sendEmail(email, code)

		return user
	},

	changePassword: async (parent, args, { User }) => {
		const { username, password } = parent

		if (!username || !password) return null

		const user = await findOneUser(username)

		if (!user) return null

		const hash = await encryptPassword(password)

		const newUser = await changePassword(username, hash)

		if (!newUser) return null

		return newUser
	},

	updateUser: async (parent, args, { User }) => {
		const { oldUsername, newUsername, name, lastName, email } = parent

		var userUpdate = {
			name: '',
			lastname: '',
			email: '',
			username: ''
		}

		if (name) {

			userUpdate.name = name
		}

		if (lastName) {

			userUpdate.lastname = lastName
		}

		if (email) {
			const findEmail = await findByEmail(email)

			if (findEmail) return null

			userUpdate.email = email
		}

		if (newUsername) {
			const user = findOneUser(newUsername)

			if (newUsername == user.username) return null

			userUpdate.userName = newUsername
		}

		if (
			userUpdate.username == '' && userUpdate.name == ''
			&& userUpdate.lastname == '' && userUpdate.email == ''
		) return null

		return await updateUser(oldUsername, userUpdate)
	},

	createEbook: async (parent, args, { Ebook }) => {
		const {
			title, subTitle, path, content, pages, published,
			language, author, authorBio, copyReader,
			copyReaderBio, illustrator, illustratorBio, edition, gender,
			description, btnPayPal, legalDepo,
			isbn, editor, editorBio, price
		} = parent
		
		/* if (!title || !subTitle || !path || !pages || !published ||
			!language || !author || !copyReader || !illustrator || !edition || !gender ||
			!description || !btnPayPal || !legalDepo || !isbn || !editor || !price) return null */

		
		const ebook = await createEbookFront(
			title, subTitle, path, content, pages, published,
			language, author, authorBio, copyReader,
			copyReaderBio, illustrator, illustratorBio, edition, gender,
			description, btnPayPal, legalDepo,
			isbn, editor, editorBio, price
		)

		return ebook

	},

	ebookPayed: async (parent, args, { User }) => {
		const { username, title } = parent

		if (!username || !title) return null

		const user = await findOneUser(username)
		const ebook = await findEbookByTitle(title)

		const update = {
			ebookAccess: ebook.title,
			
		}

		var userPay = await updateEbookFront(user.username, update)
		return userPay 

	},
	updateEbookSelled: async (parent, args, { Ebook }) => {
		const { title } = parent

		if(!title) return null

		const ebook = await findEbookByTitle(title)

		if(!ebook) return null

		return await updateEbookSelled(title, ebook.selled + 1)
	}

}