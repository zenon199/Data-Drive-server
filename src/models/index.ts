import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const contentSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    link: {
        type: String,
        required: true
    },
    tags: [{
        type: mongoose.Types.ObjectId,
        ref: 'Tag'
    }],
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const linkSchema = new mongoose.Schema({
    hash: String,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    }
})

export const User = mongoose.model('User',userSchema);
export const contentModel = mongoose.model('contentModel', contentSchema);
export const linkModel = mongoose.model('linkModel', linkSchema);