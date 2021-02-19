const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

// This is models db
const User = require('../models/model'); // Models User
const Ebook = require('../models/ebookfrontModel'); // Model EbookFront
const EbookPdf = require('../models/ebookPdf'); // Model EbookPdf


async function verifyEmail(useremail,code){
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const editorialUser = process.env.EDITORIALUSER;
  const email = process.env.EDITORIALEMAIL;
  const password = process.env.EDITORIAL_PWD;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    
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

function verifedEmail(req,res){

  /* This Function Find One user and verifed email */

  const userName = req.params.username //Username from params
  const code = req.body.code // Code to verify

  // Find user with username
  User.findOne({userName: userName}, (err,user) =>{
    if(err) {
      res.status(404).json({err})
    }else{
      
      //Verify code sended from Frontend
      if(user.codeVerify == code){

        const verifed = { verifyEmail: true}; //VerifydEmail change true 
        const username = { userName: user.userName}; //Username was update

        //Find user and Update VErifyEmail
        const userU = User.findOneAndUpdate(username,verifed,{new: true}, (err,update)=>{

          if(err){
            res.status(404).json({err})
          }else{

            //Data send to Frontend
            const dataUser ={
              id: update.id,
              username: update.userName,
              code: code,
              verifyEmail: update.verifyEmail
            }
            
            res.json({msg: 'Succes',dataUser})
          }
        });
      }else{
        res.send(err)
      }
      
    }
  });

}

async function saveCodeVerify(req,res,useremail,code,dataUser){

  /* This Function Find email to send and save codeVerify */

  // Find userEmail with email
  User.findOne({email: useremail}, (err,user) =>{
    if(err) {
      res.status(404).json({err})
    }else{

      const verifed = { codeVerify: code}; //Code of verify
      const username = { email: user.email}; // Username was updated
      
      //Find user and update Code
      User.findOneAndUpdate(username,verifed,{new: true}, (err,update)=>{
        if(err){
          res.status(404).json({err})
        }else{

          //Data send to Frontend
          const data ={
            userName: update.userName,
            code: code,
            verifyEmail: update.verifyEmail
          }

          res.json({msg: 'Succes', dataUser ,data})
        }
      });
      
    }
  });
}

async function loginUser(req, res) {

  /* This Function verifed if user and password equal true
    and send token to user
  */

  // Username and password for to verify
  const { userName, password } = req.body;

  // Find user 
  const user = await User.findOne({
    userName
    }, (err,user) =>{
      if(err) throw err;
  });
  
  // If user NOT Exist send 401 to Frontend
  if (!user) {
    res.status(401).json({message: 'User not found'}); // Send status 401
    throw Error("User not found");
  }

  // Decrypt and compare password 
  if (bcrypt.compareSync(password, user.password)) {

      const secretKey = process.env.JWT // Secret Key 
      const expireIn = "1h"; // Time expire
      const token = jwt.sign({id: user.id }, secretKey, { // Token to Jsonwebtoken
      expiresIn: expireIn

    });

    // If verifyEmail is True send data to Frontend
    if(user.verifyEmail){

      // Data send to Frontend
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

  /* This Function Encrypt password and save user */

  const saltRounds = 10; // SaltRound to encrypt password
  const salt = bcrypt.genSaltSync(saltRounds); // Generate Salt 
  const hash = bcrypt.hashSync(req.body.password, salt); // Encrypt password
  const { userName, email } = req.body; // Username and Email Verify If exist in db
  
  // Find user to save
  const user = await User.findOne({
      userName: userName
    }, (err,user) => {
    if(err) throw err;
  });

  // Find user email to save
  const userEmail = await User.findOne({
    email: email
    }, (err,user) => {
    if(err) throw err;
  });

  // If User and UserEmail NOT exist in DB was created
  if(!user && !userEmail){

    // User data Save
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
    
    // If User NOT exist
    if(!user){
      res.json({msg: 'Error',user: user,err: err}); // Send Error to Frontend
    }else{
      
      const secretKey = process.env.JWT; // Secret Key
      const expireIn = '1h'; // Time expiress
      const token = jwt.sign({id: user.id }, secretKey, { // Token to jsonwebtoken
      expiresIn: expireIn
      });

      let codeVerify = Math.random().toString(36).substr(2); // Generate code to verify

      // Data send to frontend
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

      verifyEmail(user.email,codeVerify); // Send Email with code to verify
      saveCodeVerify(req,res,user.email,codeVerify,dataUser); // Save Code to verify
      
    }
    
    });
    
  }else{
    
    // If user exist send Error to Frontend
    if(user){
      console.log('Error 408');
      res.status(408).json({msg: 'UserName Exist'});
    }
    
    // If UserEmail exist send Error to Frontend
    if(userEmail){
      console.log('Error 409');
      res.status(409).json({msg: 'Email Exist'});
    }     
  }
} 

function getAll(req, res){
    // Find All User 
    User.find({}, (err,user) => {
        if(err) throw err;
        
        res.status(200).json({user});
    });
}

async function getOneUser(req,res){

  /* This Function Find user If exist send data to Frontend  */

  const username = req.params.username; // Username get from params

  // Find user 
  const user = await User.findOne({
      userName: username
    }, (err,user) =>{
    if(err) throw err;      
  });
  
  // If User NOT exist send status 404 to Frontend
  if (!user) {
    res.status(404).json({message: 'User not found'});
    throw Error("User not found");
    
  }else{
    
    // Data send to Frontend
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

  /* This Function Save ebookFront and your especification */

  // Data Ebook
  const {
     name, path, pages, published, 
     language, author, copyReader, 
     illustrator, edition, gender, 
     description, btnPayPal, legalDepo, 
     isbn, editor, price} = req.body;

  /* const name = req.body.name
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
  const price = req.body.price */

  // Save Ebook data
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

  /* This Function Save Path to pdf */

  // Path pdf
  const name = req.body.name
  const path = req.body.pathPdf

  // Save path in db
  EbookPdf.create({
    ebook:{
      name: name,
      path: path
    }
    }, (err,pdf) =>{
    if(err) throw err;
    res.json({pdf});
  })

}

async function viewPdf(req,res){

  EbookPdf.find({},(err,ebook) =>{
    if(err){
      res.status(404).json({err})
    }else{
      res.send(ebook)
    }

  });


}

async function getPdf(req,res){

  /* This Function Find and send pdf to user */

  // id and userName get from params
  // id is to id pdf
  const { id, username} = req.params

  /* const id = req.params.id
  const userName = req.params.username */

  // Find user with userName
  const user = await User.findOne({
    userName: username},(err,user) => {
    if(err) throw err;
  });
  
  // If user NOT exist send status code 404 to frontend 
  if(!user){
    
    res.status(404).json({msg: 'User not found'}); // Send status code 404
  }else{

    const eAcess = user.ebookAcess // User Ebook acess
    
    // If Id equal to ebook acess find and send ebook 
    if(id == eAcess){

      // Find ebook
      const ebookPdf = await EbookPdf.find({_id: eAcess}, (err, pdf) =>{
        if(err)throw err;
      });
    
      // If ebookPdf NOT exist send status code 404 to Frontend
      if(!ebookPdf){
        
        res.status(404).json({err: 'Ebook Not Found'}); // Send status code 404
      }else{
        
        // Path to ebookPdf send to Frontend
        
    
        res.status(200).send(ebookPdf);
      }
      
    }else{
      console.log('Error id != eAcess')
    }

  }


}

async function getMyEbook(req,res){

  /* This Function Find and send ebook pay to user */
  
  // UserName get from params
  const userName = req.params.username 

  // Find user 
  const user = await User.findOne({
    userName: userName},(err,user) => {
    if(err) throw err;
  });

  // If User NOT exist send status code 404 to Frontend
  if(!user){
    res.status(404).json({msg: 'User not found'});
  }else{

    let eAcess = user.ebookAcess // Ebook acess verify
    let eFrontAcess = user.ebookFrontAcess // EbookFront Acess verify

    // Find ebook pdf with EbookAcess
    const ebookPdf = await EbookPdf.findOne({_id: eAcess}, (err, pdf) =>{
      if(err)throw err;
    });
  
    // If ebookPdf NOT exist send status code 404 to Frontend
    if(!ebookPdf){
      res.status(404).json({err: 'Ebook Not Found'});
    }else{
      
      // Data pdf send to Frontend
      const dataPdf = {
        ebookPdfId: ebookPdf._id,
        pathPdf: ebookPdf.pathPdf,
        eFrontAcess: eFrontAcess,
      }
      
      res.status(200).json({dataPdf});
    }
  
  }

  
}

async function getEbook(req,res){

  /* This Function Find and send all ebookFront */

  // Find All EbookFront 
  const ebook = await Ebook.find({}, (err,ebook) => {
    if(err) throw err;
  });

  // If ebook NOt exist send status code 404 to Frontend
  if(!ebook){
    res.status(404).json({msg: 'Ebook Not Found'}) // Send status code 404
    throw Error('Ebook Not Found')
  }else{
    res.status(200).send(ebook);
  }

}

async function getOneEbook(req,res){

  /* This Function Find and send one Ebook */

  // id get from params
  const id = req.params.id
  
  // Find One ebook with id
  const ebook = await Ebook.findOne({_id: id}, (err,ebook) => {
    if(err) throw err;
  });

  // If ebook NOT exist send status code 404 to Frontend
  if(!ebook){
    res.status(404).json({msg: 'Ebook Not Found'}); // send status code 404
  }else{

    // All Data ebook 
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

// Export all module
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
    verifedEmail,
    viewPdf
}