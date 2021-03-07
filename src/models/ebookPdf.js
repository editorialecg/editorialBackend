const mongoose = require('mongoose');

const opts = {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now()) },
    
    
};


const ebookPdf = mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    path: {
        type: [String],
        default: []
    }


}, opts);

module.exports = mongoose.model('ebookPdf', ebookPdf);
