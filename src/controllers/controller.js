const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');


const User = require('../models/model');
const ebook = require('../models/ebookfrontModel');



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
      const dataUser = {
        id: user.id,
        username: user.userName,
        email: user.email,
        accessToken: token,
        expireIn: expireIn
      }
      res.status(200).json({
        
        dataUser,
        message: "create user successfully"
      });
      
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
      
      const secretKey = 'yourSecretKey';
      const expireIn = '1h';
      const token = jwt.sign({id: user.id }, secretKey, {
      expiresIn: expireIn
      });
      const dataUser = {
        id: user.id,
        username: user.userName,
        name: user.name,
        country: user.country,
        email: user.email,
        accessToken: token,
        expireIn: expireIn
      }
      
      res.json({status:'success', message: 'User add', dataUser});
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
  const type = req.body.type
  const path = req.body.path
  const btnPayPal = req.body.btnPayPal


  
  ebook.create({
    name: name,
    type: type,
    path: path,
    btnPayPal: btnPayPal
  }, (err, ebook) => {
    if(err) throw err;
    
    res.json({succes: true, ebook, msg: 'Upload complete'});

  })

  
}

async function getEbook(req,res){

  
  ebook.find({}, (err,ebook) => {
      if(err){
        res.status(404).json({err: err});
      }else{ 
       res.status(200).json({ebook});
      }
  })

}

module.exports = {
    loginUser,
    saveUser,
    getAll,
    getOneUser,
    uploadEbook,
    getEbook
}