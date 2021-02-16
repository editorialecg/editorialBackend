const mongoose = require('mongoose');

const opts = {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now()) }
  };
  

const signin = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    verifyEmail:{
        type: Boolean,
    },
    codeVerify:{
        type: String
    },
    userName:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    country:{
        type: String,
        require: true
    },
    birthDateDay:{
        type: String,
        require: true
    },
    birthDateMonth:{
        type: String,
        require: true
    },
    birthDateYear:{
        type: String,
        require: true
    },
    ebookAcess:{
        type: Array
    },
    ebookFrontAcess:{
        type: Array
    }

    
}, opts );

module.exports = mongoose.model('signin',signin);
