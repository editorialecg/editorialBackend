import { Schema, model } from 'mongoose';

const opts = {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now()) },
};

const signin = Schema({
    name: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    email: {
        type: String,
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
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        require: true,
        default: ''
    },
    birthDay: {
        type: String,
        default: ''
    },
    birthMonth: {
        type: String,
        default: ''
    },
    birthYear: {
        type: String,
        default: ''
    },
    ebookAccess: {
        type: Array,
        default: []
    },
    

}, opts);

export default model('signin', signin);
