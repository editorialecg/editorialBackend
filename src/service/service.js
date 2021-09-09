import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { createTransport } from "nodemailer";

export async function comparePassword(password, passwordUser) {
    return compareSync(password, passwordUser);
}

export async function encryptPassword(password) {
    const saltRounds = 10; // SaltRound to encrypt password
    const salt = genSaltSync(saltRounds); // Generate Salt 
    const hash = hashSync(password, salt); // Encrypt password

    return hash;
}

export async function generateToken(userId) {

    const secretKey = process.env.JWT; // Secret Key 
    const expireIn = "1h"; // Time expire
    const token = sign({ id: userId }, secretKey, {
        expiresIn: expireIn
    });

    return token;

}

export async function sendEmail(userEmail, code) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    const editorialUser = process.env.EDITORIALUSER;
    const email = process.env.EDITORIALEMAIL;
    const password = process.env.EDITORIAL_PWD;
    // create reusable transporter object using the default SMTP transport
    let transporter = createTransport({
        host: 'smtp.editorialgrande.com',
        port: 587,
        secure: false,
        requireTLS: true,
        tls: { rejectUnauthorized: false },
        auth: {
            user: email,
            pass: password
        },
    });

    // send mail with defined transport object
    transporter.sendMail({
        from: `Soporte de Escribe como los Grandes ${email}`,
        to: userEmail,
        subject: "Codigo de verificación",
        text: "Tu codigo de verificación es: " + code, // plain text body
        //html: "<b>Hello world?</b>", // html body
    }, (err, mail) => {
        if (err) {
            console.log(err);
        } else {
            return mail
        }
    });
}

export async function generateCode() {
    return Math.random().toString(36).substr(2);
}