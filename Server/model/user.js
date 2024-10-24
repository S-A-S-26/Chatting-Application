const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken')

// const messageSchema = new Schema({
//     sender: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // The sender of the message
//     content: { type: String, required: true }, // Message content
//     seen: { type: Boolean, default: false },
//     timestamp: { type: Date, default: Date.now }, // Timestamp of when the message was sent
// });

const userSchema = new Schema({
    username: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: { type: String },
    status: { type: String, default: "Hey There" },
    pinned: { type: [String] },
    unseenCount: { type: Number, default: 0 },
    lastMsgTimestamp: { type: Date, required: true, default: null },
    lastSeen: { type: Date, required: true, default: Date.now() },
    createdAt: { type: Date, required: true, default: Date.now() },
}, { timestamps: true })

userSchema.methods.jwtSign = async function() {
    console.log(this)
    try {
        return await jwt.sign({ ...this, _id: this._id.toString() }, process.env.JWT_SECRET)
    } catch (error) {
        console.log("Error while signing JWT", error)
    }
}

const User = new model('User', userSchema)

module.exports = User
