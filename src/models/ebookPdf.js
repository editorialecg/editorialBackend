import { Schema, model } from 'mongoose';

const opts = {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now()) },
    
    
};


const ebookPdf = Schema({

    title: {
        type: String,
        require: true
    },
    path: {
        type: [String],
        default: []
    }


}, opts);

export default model('ebookPdf', ebookPdf);
