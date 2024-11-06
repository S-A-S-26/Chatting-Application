const Chat = require('../model/chat')
const { io } = require('../app')
const { getInstanceIo, online } = require('../socket/socket')


async function createGroup(req, res) {
    console.log("create groupChat req body", req.body)
    try {
        if (req.body) {
            let chat = await Chat.findOne({ groupName: req.body.groupName })
            let newMessageId
            // console.log("existing chat", chat)
            if (!req.body.new) {
                // console.log("req.body.messages", req.body.message)
                chat.messages.push(req.body.message)
                newMessageId = chat.messages[chat.messages.length - 1]._id;
            } else {
                chat = new Chat({
                    "participants": req.body.participants,
                    "isGroup": true,
                    "groupName": req.body.groupName,
                    "creator": req.body.creator,
                })
            }
            // console.log('chat', chat)
            await chat.save()
            sendDataToReceipient(req.body.sentBy, req.body.groupName, req.body.message, newMessageId)
            res.status(200).json({ msg: "message sent successfully" })
        } else {
            res.status(500).json({
                msg: `Server Error:${error}`
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: `Server Error:${error}`
        })
    }
}

async function sendDataToReceipient(sender, room, message, mid) {
    console.log("paritcipants", message)
    const socketio = getInstanceIo()
    message.timestamp = new Date()
    message._id = mid
    // console.log("sendDataToReceipient", socketio)
    // socketio.emit("welcome", "Socket from chat responding")
    socketio.to(room).emit('roomMessage', { message, sender })
}
module.exports = createGroup
