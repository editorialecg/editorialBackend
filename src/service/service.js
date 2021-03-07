const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

module.exports = {

    async comparePassword(password, passwordUser) {
        return bcrypt.compareSync(password, passwordUser)
    },

    async encryptPassword(password){
        const saltRounds = 10; // SaltRound to encrypt password
        const salt = bcrypt.genSaltSync(saltRounds); // Generate Salt 
        const hash = bcrypt.hashSync(password, salt); // Encrypt password

        return hash
    },
    

    async generateToken(userId) {

        const secretKey = process.env.JWT // Secret Key 
        const expireIn = "1h"; // Time expire
        const token = jwt.sign({ id: userId }, secretKey, { // Token to Jsonwebtoken
            expiresIn: expireIn

        });

        return token

    },

    async sendEmail(userEmail, code) {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        const editorialUser = process.env.EDITORIALUSER;
        const email = process.env.EDITORIALEMAIL;
        const password = process.env.EDITORIAL_PWD;
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            service: 'gmail',
            auth: {
                user: editorialUser,
                pass: password
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            }
        });

        // send mail with defined transport object
        transporter.sendMail({
            from: email, // sender address
            to: userEmail, // list of receivers
            subject: "Codigo de verificación", // Subject line
            text: "Tu codigo de verificación es: " + code, // plain text body
            //html: "<b>Hello world?</b>", // html body
        }, (err, mail) => {
            if (err) {
                console.log(err)
            } else {

            }
        });
    },

    async generateCode() {
        
        return Math.random().toString(36).substr(2);
    }
}