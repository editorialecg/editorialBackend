const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

// This is models db
const User = require('../models/model'); // Models User
const Ebook = require('../models/ebookfrontModel'); // Model EbookFront
const EbookPdf = require('../models/ebookPdf'); // Model EbookPdf

class Controller{

  verifyEmail(useremail,code){
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

  createCode(){
    return Math.random().toString(36).substr(2);
  }

  async loginUser(req, res) {

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

  async verifedEmail(req,res){

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
  
  saveCodeVerify(req,res,useremail,code,dataUser){
  
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
  
  async saveUser(req, res){
  
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
  
        // Generate code to verify
        let codeVerify = this.createCode()
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
  
        this.verifyEmail(user.email,codeVerify); // Send Email with code to verify
        this.saveCodeVerify(req,res,user.email,codeVerify,dataUser); // Save Code to verify
        
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
  
  getAll(req, res){
      // Find All User 
      User.find({}, (err,user) => {
          if(err) throw err;
          
          res.status(200).json({user});
      });
  }
  
  async getOneUser(req,res){
  
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

  async getConfigUser(req,res){
  
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
        userName: user.userName,
        
      }
  
      res.status(200).json({profileDataUser, msg: 'User Profile data'});
    }
    
  }

  async updateUser(req,res){
    const { name, lastName, email, userName } = req.body

    const UserName = req.params.username

    const username = await User.findOne({ userName: userName}, (err,user) =>{
      if(err) throw err;
    });

    const userEmail = await User.findOne({email: email}, (err,email) =>{
      if(err) throw err;
    })

    if (name) {
      
      const find = {
        userName: UserName
      }
  
      const update = {
        name: name,
      }
  
      const Uname = await User.updateOne(find,update,(err,update) =>{
        if(err) throw err;
        
      });

      res.json({Uname})
      
    }
    
    if(lastName){
      const find = {
        userName: UserName
      }
  
      const update = {
        lastName: lastName,
      }
  
      const Ulastname = await User.updateOne(find,update,(err,update) =>{
        if(err) throw err;
        
      });

      res.json({Ulastname})
    }

    if(email == 'undefined' || email == null){

    }else{
      if(!userEmail ){
        const find = {
          userName: UserName
        }
    
        const update = {
          email: email,
        }
    
        const Uemail = await User.updateOne(find,update,(err,update) =>{
          if(err) throw err;
          
        });
  
        res.json({Uemail})
        
      }else{
        res.status(409).send()
      }
    }

    if(userName == 'undefined' || userName == null){

    }else{
      if(!username){
        const find = {
          userName: UserName
        }
    
        const update = {
          userName: userName
        }
    
        await User.updateOne(find,update,(err,update) =>{
          if(err) throw err;
          
        });
        const profileDataUser = {
          userName: userName
        }
    
        res.status(200).json({profileDataUser, msg: 'User Profile data'});
      }else{
        res.status(408).send()
      }
    }
    
    

  }
  
  uploadEbook(req,res){
  
    /* This Function Save ebookFront and your especification */
  
    // Data Ebook
    const {
       name, subTitle, path, pages, published, 
       language, author, authorBio, copyReader,
       copyReaderBio, illustrator, illustratorBio, edition, gender, 
       description, btnPayPal, legalDepo, 
       isbn, editor, editorBio, price } = req.body;
  
  
    // Save Ebook data
    Ebook.create({
      name: name,
      subTitle: subTitle,
      path: path,
      pages: pages,
      published: published,
      language: language,
      author: author,
      authorBio: authorBio,
      copyReader: copyReader,
      copyReaderBio: copyReaderBio,
      illustrator: illustrator,
      illustratorBio: illustratorBio,
      edition: edition,
      gender: gender,
      description: description,
      btnPayPal: btnPayPal,
      legalDepo: legalDepo,
      isbn: isbn,
      editor: editor,
      editorBio: editorBio,
      price: price
  
    }, (err, ebook) => {
      if(err) throw err;
      res.json({succes: true, ebook, msg: 'Upload complete'});
    })
    
  }
  
  async uploadPdf(req,res){
  
    /* This Function Save Path to pdf */
  
    // Path pdf
    const name = req.body.name
    const path = req.body.path
    

    // Save path in db
    const ebookpdf = await EbookPdf.findOne({name: name}, (err,ebook) =>{
      if(err) throw err;
      
    });
    

    if(!ebookpdf){
      
      EbookPdf.create({
        name: name,
        path: path
        
      }, (err,pdf) =>{
        if(err) throw err;
        res.json({pdf});
      })
    }else{
      const find = {
        name: name
      }
      
      const pathPdf = {
        $push:{
          path: path
        }
      }

      EbookPdf.updateOne(find,pathPdf, (err,pdf) =>{
        if(err) throw err;
        res.json({pdf});
      })
    }
    
  }
  
  viewPdf(req,res){
  
    EbookPdf.find({},(err,ebook) =>{
      if(err){
        res.status(404).json({err})
      }else{
        res.send(ebook)
      }
  
    });
  
  
  }
  
  async getPdf(req,res){
  
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
      
      console.log(eAcess)
      console.log(id)
      for (let i = 0; i <= eAcess.length; i++) {
        const acess = eAcess[i];
        // If Id equal to ebook acess find and send ebook 
        if(id == acess){
  
          // Find ebook
          const ebookPdf = await EbookPdf.find({_id: eAcess}, (err, pdf) =>{
            if(err)throw err;
          });
        
          // If ebookPdf NOT exist send status code 404 to Frontend
          if(!ebookPdf){
            
            res.status(404).json({err: 'Ebook Not Found'}); // Send status code 404
          }else{
            
            // Path to ebookPdf send to Frontent
        
            res.status(200).send(ebookPdf);
          }
          
        }else{
          console.log('Error id != eAcess')
        }
        
      }
  
      
  
    }
  
  
  }
  
  async getMyEbook(req,res){
  
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
  
  async getEbook(req,res){
  
    /* This Function Find and send all ebookFront */
  
    // Find All EbookFront 
    const ebook = await Ebook.find({},(err,ebook) => {
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
  
  async getOneEbook(req,res){
  
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
          subTitle: ebook.subTitle,
          path: ebook.path,
          pages: ebook.pages,
          published: ebook.published,
          language: ebook.language,
          author: ebook.author,
          authorBio: ebook.authorBio,
          copyReader: ebook.copyReader,
          copyReaderBio: ebook.copyReaderBio,
          illustrator: ebook.illustrator,
          illustratorBio: ebook.illustratorBio,
          edition: ebook.edition,
          gender: ebook.gender,
          description: ebook.description,
          btnPayPal: ebook.btnPayPal,
          legalDepo: ebook.legalDepo,
          isbn: ebook.isbn,
          editor: ebook.editor,
          editorBio: ebook.editorBio,
          price: ebook.price
      }
      res.status(200).json({ebookData});
    }
  
  }
  
  async ebookPay(req,res){
    const { user, front, pdf} = req.params
  
    console.log( user, front, pdf)
  
    const ebookFront = await Ebook.findOne({_id: front}, (err,front) =>{
      if(err){
        res.status(404).json({err})
      }
    });
  
    const ebookPdf = await EbookPdf.findOne({_id: pdf}, (err,pdf) =>{
      if(err){
        res.status(404).json({err})
      }
    });
  
    User.findOne({userName: user}, (err,user) => {
      if(err){
        res.status(404).json({err})
      }else{
  
        const idFront = {
            $push:{
              ebookAcess: [ebookPdf._id],
              ebookFrontAcess: [ebookFront.path]
            }
        }
        const userName = {userName: user.userName}
  
  
        User.updateOne(userName,idFront, (err,update) =>{
          if(err)throw err;
          
          
          res.json({update})
          
        })
  
      }
    });
  
  
  }
  
  async confirmPassword(req,res){
    const password = req.body.password
    const userName = req.params.username

    const userPassword = await User.findOne({userName: userName}, (err,user) =>{
      if(err) throw err;
    })

    if(bcrypt.compareSync(password,userPassword.password)){
      res.json({data: userPassword.userName,msg: 'Password Match'})
    }else{
      res.status(401).json({msg: 'Password not match'})
    }

  }

  async changePassword(req,res){
    const userName = req.params.username
    const password = req.body.password

    const saltRounds = 10; // SaltRound to encrypt password
    const salt = bcrypt.genSaltSync(saltRounds); // Generate Salt 
    const hash = bcrypt.hashSync(password, salt);

    const userPassword = await User.findOne({userName: userName}, (err,user) =>{
      if(err) throw err;
    })

    const find ={
      userName: userPassword.userName
    }


    const update = {
      password: hash
    }

    User.updateOne(find,update, (err,update) =>{
      if(err) throw err;
      res.json({msg: 'Password Update'})
    })

  }

  async confirmUser(req,res){
    const username = req.body.username

    const user = await User.findOne({userName: username}, (err,user) => {
      if(err) throw err;
    });

    if(!user){
      res.status(404).send()
    }else{
      const code = await this.createCode()
      const email = user.email

      const dataUser ={
        id: user.id,
        username: user.userName,
        code: code,
        verifyEmail: user.verifyEmail
      }      

      this.saveCodeVerify(req,res,email,code,dataUser)

      this.verifyEmail(email,code)

    }

  }

  async confirmCode(req,res){
    const code = req.body.code
    const username = req.params.username

    const user = await User.findOne({userName: username}, (err,user) =>{
      if(err)throw err;
    })

    if(code == user.codeVerify){
      res.json({sucess: true})
    }else{
      res.status(401).send()
    }

  }

}

const controller = new Controller()

// Export all module
module.exports = { controller }