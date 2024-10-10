const Chat = require('../model/chat')

async function addSeenStatus(message, socket, receiver) {
    await Chat.updateOne(
        {
            _id: message.chat_id, // chat document ID
            "messages._id": message.message_id, // message ID
        },
        {
            $set: { "messages.$.seen": true }
        }
    )
    console.log("sending seen status to receiver")
    socket.to(receiver).emit('seenstatusset', message.message_id)
}

module.exports = addSeenStatus
