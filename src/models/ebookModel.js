const mongoose = require('mongoose');

const opts = {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now()) }
  };
  

const ebookFront = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    type:{
        type: String,
        require: true
    },
    path:{
        type: String,
        require: true
    },
    size:{
        type: Number,
        require: true
    },
}, opts );

module.exports = mongoose.model('ebookFront',ebookFront);
