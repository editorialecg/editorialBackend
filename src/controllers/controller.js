const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");


const User = require('../models/model');
const Ebook = require('../models/ebookfrontModel');
const EbookPdf = require('../models/ebookPdf');


async function verifyEmail(useremail,code){
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const editorialUser = process.env.EDITORIALUSER
  const email = process.env.EDITORIALEMAIL
  const password = process.env.EDITORIAL_PWD
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 465,
    secure: true,
    requireTLS: true,
    service: 'gmail',
    auth: {
      user: editorialUser,
      pass: password
    }
  });

  // send mail with defined transport object
  transporter.sendMail({
    from: email, // sender address
    to: useremail, // list of receivers
    subject: "Codigo de verificación", // Subject line
    text: "Tu codigo de verificación es: " + code, // plain text body
    //html: "<b>Hello world?</b>", // html body
  }, (err,mail) =>{
    if(err){
      console.log(err)
    }else{
      
    }
  });
  
  

}

async function saveCodeVerify(req,res,useremail,code,dataUser){
  User.findOne({email: useremail}, (err,user) =>{
    if(err) {
      res.status(404).json({err})
    }else{

      const verifed = { codeVerify: code};
      const username = { email: user.email};
      User.findOneAndUpdate(username,verifed,{new: true}, (err,update)=>{
        if(err){
          res.status(404).json({err})
        }else{
          const data ={
            userName: update.userName,
            code: code
          }

          
          res.json({msg: 'Succes', dataUser ,data})
        }
      });
      
    }
  });
}

function verifedEmail(req,res){
  const userName = req.params.username
  const code = req.body.code

  User.findOne({userName: userName}, (err,user) =>{
    if(err) {
      res.status(404).json({err})
    }else{
      console.log(code)
      console.log(user.codeVerify)
      
      if(user.codeVerify == code){
        const verifed = { verifyEmail: true};
        const username = { userName: user.userName};
        const userU = User.findOneAndUpdate(username,verifed,{new: true}, (err,update)=>{
          if(err){
            res.status(404).json({err})
          }else{
            const data ={
              userName: update.userName,
              code: code,
              verify: update.verifyEmail
            }

            
            res.json({msg: 'Succes',data})
          }
        });
      }else{
        res.send(err)
      }
      
      
    }
  });

}

async function loginUser(req, res) {
    const { userName, password } = req.body;
    const user = await User.findOne({
      userName
      }, (err,user) =>{
        if(err) throw err;
    });
    
    if (!user) {
      res.status(401).json({message: 'User not found'});
      throw Error("User not found");
      
    }
    if (bcrypt.compareSync(password, user.password)) {
        const secretKey = process.env.JWT
        const expireIn = "1h";
        const token = jwt.sign({id: user.id }, secretKey, {
        expiresIn: expireIn
      });
      if(user.verifyEmail){
        const dataUser = {
          id: user.id,
          username: user.userName,
          email: user.email,
          verifyEmail: user.verifyEmail,
          accessToken: token,
          expireIn: expireIn
        }
        res.status(200).json({
          
          dataUser,
          message: "create user successfully"
        });
      }else{
        const dataUser = {
          id: user.id,
          username: user.userName,
          email: user.email,
          verifyEmail: user.verifyEmail,
          accessToken: token,
          expireIn: expireIn
        }
        res.json({dataUser})
      }
      
    } else {
      res.status(406).json({
        message: "Unauthenticated"
      });
    }
}

async function saveUser(req, res){
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const { userName, email } = req.body;
  const body = req.body;
  
  const user = await User.findOne({
      userName: body.userName
    }, (err,user) => {
    if(err) throw err;
  });

  const userEmail = await User.findOne({
    email: body.email
    }, (err,user) => {
    if(err) throw err;
  });

  if(!user && !userEmail){
    User.create({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      verifyEmail: false,
      codeVerify: '0abc',
      userName: req.body.userName,
      password: hash,
      country: req.body.country,
      birthDateDay: req.body.birthDateDay,
      birthDateMonth: req.body.birthDateMonth,
      birthDateYear: req.body.birthDateYear
    },(err,user) => {
    if(!user){
      
      res.json({msg: 'Error',user: user,err: err});
    }else{
      
      const secretKey = process.env.JWT;
      const expireIn = '1h';
      const token = jwt.sign({id: user.id }, secretKey, {
      expiresIn: expireIn
      });
      let codeVerify = Math.random().toString(36).substr(2);
      const dataUser = {
        id: user.id,
        username: user.userName,
        name: user.name,
        country: user.country,
        email: user.email,
        accessToken: token,
        expireIn: expireIn,
        code : codeVerify,
        verifyEmail: user.verifyEmail
      }
      verifyEmail(user.email,codeVerify);
      saveCodeVerify(req,res,user.email,codeVerify,dataUser);
      
    }
    
    });
    
  }else{
        
    if(user){
      console.log('Error 408');
      res.status(408).json({msg: 'UserName Exist'});
    }
    
    if(userEmail){
      console.log('Error 409');
      res.status(409).json({msg: 'Email Exist'});
    }     
  }
} 


function getAll(req, res){
    User.find({}, (err,user) => {
        if(err) throw err;
        
        res.status(200).json({user});
    });
}

async function getOneUser(req,res){
  const username = req.params.username;
  const user = await User.findOne({
      userName: username
    }, (err,user) =>{
    if(err) throw err;
        
  });
  
  if (!user) {
    res.status(404).json({message: 'User not found'});
    throw Error("User not found");
    
  }else{
    const profileDataUser = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      ebookAcess: user.ebookAcess,
      userName: user.userName,
      pais: user.country,
      birthDateDay: user.birthDateDay,
      birthDateMonth: user.birthDateMonth,
      birthDateYear: user.birthDateYear
    }
    res.status(200).json({profileDataUser, msg: 'User Profile data'});
  }
  
}

async function uploadEbook(req,res){


  const name = req.body.name
  const path = req.body.path
  const pages = req.body.pages
  const published = req.body.published
  const language = req.body.language
  const author = req.body.author
  const copyReader = req.body.copyReader
  const illustrator = req.body.illustrator
  const edition = req.body.edition
  const gender = req.body.gender
  const description = req.body.description
  const btnPayPal = req.body.btnPayPal
  const legalDepo = req.body.legalDepo
  const isbn = req.body.isbn
  const editor = req.body.editor
  const price = req.body.price

  
  Ebook.create({
    name: name,
    path: path,
    pages: pages,
    published: published,
    language: language,
    author: author,
    copyReader: copyReader,
    illustrator: illustrator,
    edition: edition,
    gender: gender,
    description: description,
    btnPayPal: btnPayPal,
    legalDepo: legalDepo,
    isbn: isbn,
    editor: editor,
    price: price

  }, (err, ebook) => {
    if(err) throw err;
    
    res.json({succes: true, ebook, msg: 'Upload complete'});

  })

  
}

async function uploadPdf(req,res){
  path = req.body.pathPdf

  ebookPdf.create({pathPdf : path}, (err,pdf) =>{
    if(err) throw err;
    res.json({pdf});
  })

}

async function getPdf(req,res){
  const id = req.params.id
  const userName = req.params.username

  const user = await User.findOne({
    userName: userName},(err,user) => {
    if(err) throw err;
  });

  if(!user){
    res.status(404).json({msg: 'User not found'});
    console.log('User not found');
  }else{
    let eAcess = user.ebookAcess

    if(id == eAcess){
      const pdf = await EbookPdf.findOne({_id: eAcess}, (err, pdf) =>{
        if(err)throw err;
      });
    
      if(!pdf){
        res.status(404).json({err: 'Ebook Not Found'});
        console.log('ebook not found');
      }else{
    
        const dataPdf = {
          pathPdf: pdf.pathPdf
        }
    
        res.status(200).json({dataPdf});
      }
      
    }else{
      console.log('Error id != eAcess')
    }

  }


}

async function getMyEbook(req,res){
  
  const userName = req.params.username

  const user = await User.findOne({
    userName: userName},(err,user) => {
    if(err) throw err;
  });

  if(!user){
    res.status(404).json({msg: 'User not found'});
    console.log('User not found');
  }else{
    let eAcess = user.ebookAcess
    let eFrontAcess = user.ebookFrontAcess
    
   

    const pdf = await EbookPdf.findOne({_id: eAcess}, (err, pdf) =>{
      if(err)throw err;
    });
  
    if(!pdf){
      res.status(404).json({err: 'Ebook Not Found'});
      console.log('ebook not found');
    }else{
  
      const dataPdf = {
        ebookPdfId: pdf._id,
        pathPdf: pdf.pathPdf,
        eFrontAcess: eFrontAcess,
  
  
      }
      
      res.status(200).json({dataPdf});
    }
  
  }

  
}

async function getEbook(req,res){

  
  const ebook = await Ebook.find({}, (err,ebook) => {
    if(err) throw err;
  });
  if(!ebook){
    res.status(404).json({msg: 'Ebook Not Found'})
    throw Error('Ebook Not Found')
  }else{
    
    res.status(200).send(ebook);
  }

}

async function getOneEbook(req,res){

  const _id = req.params.id
  
  const ebook = await Ebook.findOne({_id: _id}, (err,ebook) => {
    if(err) throw err;
  });
  if(!ebook){
    res.status(404).json({msg: 'Ebook Not Found'});
  }else{
    const ebookData = {
        name: ebook.name,
        path: ebook.path,
        pages: ebook.pages,
        published: ebook.published,
        language: ebook.language,
        author: ebook.author,
        copyReader: ebook.copyReader,
        illustrator: ebook.illustrator,
        edition: ebook.edition,
        gender: ebook.gender,
        description: ebook.description,
        btnPayPal: ebook.btnPayPal,
        legalDepo: ebook.legalDepo,
        isbn: ebook.isbn,
        editor: ebook.editor,
        price: ebook.price
    }
    res.status(200).json({ebookData});
  }

}

module.exports = {
    loginUser,
    saveUser,
    getAll,
    getOneUser,
    uploadEbook,
    getEbook,
    getOneEbook,
    uploadPdf,
    getPdf,
    getMyEbook,
    verifedEmail
}