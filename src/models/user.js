const mongoose = require('mongoose');

const opts = {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now()) },
};



const signin = mongoose.Schema({
    name: {
        type: String,
        require: true,
        default: ''
    },
    lastName: {
        type: String,
        require: true,
        default: ''
    },
    email: {
        type: String,
        require: true,

        default: ''
    },
    verifyEmail: {
        type: Boolean,
    },
    codeVerify: {
        type: String,
        default: ''
    },
    userName: {
        type: String,
        require: true,

        default: ''
    },
    password: {
        type: String,
        require: true,
        default: ''
    },
    country: {
        type: String,
        require: true,
        default: ''
    },
    birthDateDay: {
        type: String,
        require: true,
        default: ''
    },
    birthDateMonth: {
        type: String,
        require: true,
        default: ''
    },
    birthDateYear: {
        type: String,
        require: true,
        default: ''
    },
    ebookAcess: {
        type: Array,
        default: []
    },
    ebookFrontAcess: {
        type: Array,
        default: []
    }

}, opts);

module.exports = mongoose.model('signin', signin);
