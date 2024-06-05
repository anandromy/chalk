import mongoose, { Document, Schema } from "mongoose"

interface Message extends Document {
    content: string
    createdAt: Date
}

const messageSchema: Schema<Message> = new mongoose.Schema({
    content: {
        type: String,
        required: [ true, "Message content is required" ]
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

interface User extends Document {
    username: string
    email: string
    password: string
    verifyCode: string
    verifyCodeExpiry: Date
    isVerified: Boolean
    isAcceptingMessage: boolean
    messages: Message[]
}

const userSchema: Schema<User> = new mongoose.Schema({
    username: { 
        type: String, 
        required: [ true, "username is required" ] 
    },
    email: { 
        type: String, 
        unique: true, 
        match: [/.+\@.+\..+/, 'please use a valid email'], 
        required: [ true, "email is required" ] 
    },
    password: { 
        type: String, 
        required: [true, "password is required" ] 
    },
    verifyCode: { 
        type: String, 
        required: [ true, "verify code is required" ] 
    },
    verifyCodeExpiry: { 
        type: Date, 
        required: [ true, "verify code expiry is required" ] 
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: { 
        type: Boolean, 
        required: [ true, "is accepting message is required" ],
        default: true 
    },
    messages: [messageSchema]
})


export const User = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', userSchema)
export const Message = (mongoose.models.Message as mongoose.Model<Message>) || mongoose.model<Message>('Message', messageSchema)