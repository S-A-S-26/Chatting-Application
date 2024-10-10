const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define message schema
const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // The sender of the message
    content: { type: String, required: true }, // Message content
    seen: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }, // Timestamp of when the message was sent
});

// Define chat schema
const chatSchema = new Schema({
    participants: [
        { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Array to hold sender and recipient
    ],
    messages: [messageSchema], // Array of messages
    createdAt: { type: Date, default: Date.now }, // When the chat started
    updatedAt: { type: Date, default: Date.now }, // Last updated time
});

// Middleware to update `updatedAt` on message addition
chatSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
