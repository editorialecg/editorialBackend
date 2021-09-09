import { Schema, model } from 'mongoose';

const opts = {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now()) },
    
    
};


const ebookFront = Schema({
    title: {
        type: String,
        require: true
    },

    subTitle: {
        type: String,
    },

    path: {
        type: String,
        require: true
    },

    pages: {
        type: String,
        require: true
    },

    content:{
        type: [String]
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
    },
    selled: {
        type: Number,
        default: 0
    }

}, opts);

export default model('ebookfronts', ebookFront);
