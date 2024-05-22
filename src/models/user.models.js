import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Username is required'],
        trim: true,
        index: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Email is required'],
        trim: true,
    },
    fullName: {
        type: String,
        lowercase: true,
        required: [true, 'Fullname is required'],
        trim: true,
        index: true,
    },
    avatar: {
        type: String,
        required: [true, 'Avatar image is required'],
    },
    coverlmage: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String

    }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    jwt.sign({
        _id: this._id,
        email: this.email,
        fullName: this.fullName,
        username: this.username
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}
userSchema.methods.generateRefreshToken = function () {
    jwt.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const User = model("User", userSchema)