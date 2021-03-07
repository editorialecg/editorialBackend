const userModel = require('./model')
const userDto = require('./DTO')
const service = require('../../service/service')

module.exports = {

  async getOneUser(req, res) {

    const username = req.params.username

    if (!username) return res.status(400)

    const user = await userModel.findOneUser(username);

    if (!user) return res.status(404).send()

    const send = await userDto.sendOneUser(user.name, user.lastName, user.email, user.ebookAcess, user.userName, user.country, user.birthDateDay, user.birthDateMonth, user.birthDateYear)
    return res.status(200).json({profileDataUser:send});

  },

  async loginUser(req, res) {

    const { userName, password } = req.body;

    if (!userName || !password) return res.status(400).send()

    const user = await userModel.findOneUser(userName)

    if (!user) return res.status(404).send('User not found')

    if (await service.comparePassword(password, user.password)) {

      if (user.verifyEmail) {
        const token = service.generateToken(user.id)

        const send = await userDto.sendLoginUser(user.id, user.userName, user.email, user.verifyEmail, token)

        return res.status(200).json({dataUser:send});

      } else {
        const token = service.generateToken(user.id)

        return res.status(401).send(await userDto.sendLoginUser(user.id, user.userName, user.email, user.verifyEmail, token));
      }

    } else {

      return res.status(401).send();

    }


  },

  async createUser(req, res) {

    const { name, lastName, userName, email, password, country, birthDateDay, birthDateMonth, birthDateYear } = req.body

    if (!name || !lastName || !email || !country || !birthDateDay || !birthDateMonth || !birthDateYear
      || !userName || !password) return res.status(400).send();

    const user = await userModel.findOneUser(userName)
    const userEmail = await userModel.findByEmail(email)

    if (!user || !userEmail) {

      const code = await service.generateCode()
      const hash = await service.encryptPassword(password)

      const User = await userModel.createUser(
        name, lastName, email, false, code, userName, hash, country, birthDateDay, birthDateMonth, birthDateYear
      )

      const token = await service.generateToken(User.id)
      await service.sendEmail(User.email, code)
        
      const send = await userDto.sendCreateUser(User.id, User.name, User.userName, User.email, User.country, User.verifyEmail, token)

      console.log(send)


      return res.status(200).json({dataUser:send});

    }

    return res.status(401).send()

  },

  async confirmEmail(req, res) {

    const userName = req.params.username
    const code = req.body.code

    if (!userName || !code) return res.status(400).send()

    const user = await userModel.findOneUser(userName)

    if (!user) return res.status(404).send();

    if (user.codeVerify == code) {

      const userU = await userModel.confirmEmail(userName, true)

      const token = await service.generateToken()

      const send = await userDto.sendConfirmEmail(userU.id, userU.userName, userU.verifyEmail,token)
      return res.status(200).json({dataUser:send})

    } else {
      return res.status(401).send()
    }

  },

  async confirmPassword(req, res) {

    const password = req.body.password
    const userName = req.params.username

    if (!userName || !password) return res.status(400).send()

    const user = await userModel.findOneUser(userName);

    if (!user) return res.status(404).send()

    if (await service.comparePassword(password, user.password)) return res.status(200).json({msg:'Confirmed'});

    return res.status(401).send()

  },

  async changePassword(req, res) {

    const userName = req.params.username
    const password = req.body.password

    if (!userName || !password) return res.status(400).send()

    const user = await userModel.findOneUser(userName)

    if (!user) return res.status(404).send()

    const hash = await service.encryptPassword(password)

    await userModel.changePassword(userName, hash)

    return res.status(200).send()

  },

  async updateUser(req, res) {
    const { name, lastName, email, userName } = req.body
    const { username } = req.params


    if (name) {

      await userModel.changeName(username, name)

      return res.status(200).send()
    }

    if (lastName) {

      await userModel.changelastName(username, lastName)

      return res.status(200).send()
    }

    if (email) {
      const userEmail = await userModel.findOneUser(username)

      if (email == userEmail.email) return res.status(401).send()

      await userModel.changeEmail(username, email)

      return res.status(200).send('Updated email')
    }

    if (userName) {
      const UserName = await userModel.findOneUser(username)

      if (userName == UserName.userName) return res.status(401).sned()

      await userModel.changeUsername(username, userName)

      return res.status(200).send(await userDto.sendUpdateUsername(userName))
    }

  },

  async configUser(req, res) {

    const username = req.params.username

    const user = await userModel.findOneUser(username)

    if (!user) return res.status(404).send()

    const send = await userDto.sendConfigUser(user.name, user.lastName, user.email, user.userName)

    return res.status(200).json({profileDataUser:send})

  },

  async confirmUser(req,res){
    const { userName } = req.body

    if(!userName) return res.status(400).send()

    const user = await userModel.findOneUser(userName)

    if(!user) return res.status(404).send()

    const code = await service.generateCode()
    const email = user.email

    service.sendEmail(email,code)

    return res.status(200).send(await userDto.sendConfirmUser(user.id,user.userName,user.verifyEmail))
  }

}
