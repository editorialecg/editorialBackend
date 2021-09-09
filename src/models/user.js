import { Schema, model } from 'mongoose';

const opts = {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now()) },
};

const signin = Schema({
    name: {
        type: String,
        require: true,
        default: ''
    },
    lastname: {
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
    username: {
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
    birthDay: {
        type: String,
        require: true,
        default: ''
    },
    birthMonth: {
        type: String,
        require: true,
        default: ''
    },
    birthYear: {
        type: String,
        require: true,
        default: ''
    },
    ebookAccess: {
        type: Array,
        default: []
    },
    

}, opts);

export default model('signin', signin);
