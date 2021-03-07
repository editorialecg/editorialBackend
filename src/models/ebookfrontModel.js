const mongoose = require('mongoose');

const opts = {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now()) },
    
    
};


const ebookFront = mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    subTitle: {
        type: String,
        require: true
    },

    path: {
        type: String,
        require: true
    },

    pages: {
        type: String,
        require: true
    },

    published: {
        type: String,
        require: true
    },

    language: {
        type: String,
        require: true
    },

    author: {
        type: String,
        require: true
    },

    authorBio: {
        type: String,
        require: true
    },

    copyReader: {
        type: String,
        require: true
    },

    copyReaderBio: {
        type: String,
        require: true
    },

    illustrator: {
        type: String,
        require: true
    },

    illustratorBio: {
        type: String,
        require: true
    },

    editor: {
        type: String,
        require: true
    },

    editorBio: {
        type: String,
        require: true
    },

    edition: {
        type: String,
        require: true
    },

    gender: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    btnPayPal: {
        type: String,
        require: true
    },

    legalDepo: {
        type: String,
        require: true
    },

    isbn: {
        type: String,
        require: true
    },

    price: {
        type: String,
        require: true
    }

}, opts);

module.exports = mongoose.model('ebookFront', ebookFront);
