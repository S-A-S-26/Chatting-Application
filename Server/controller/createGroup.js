const Chat = require('../model/chat')
const User = require('../model/user')
const { io } = require('../app')
const { getInstanceIo, online } = require('../socket/socket')


async function createGroup(req, res) {
    console.log("create groupChat req body", req.body, req.body.room)
    console.log("req.body.partic", req.body.participants, typeof req.body.participants)
    try {
        if (req.body) {
            let chat = await Chat.findOne({ groupName: req.body.room, isGroup: true })
            let newMessageId
            console.log("existing chat", chat)
            if (!req.body.new) {
                // console.log("req.body.messages", req.body.message)
                console.log("add message to existing")
                chat.messages.push(req.body.message)
                newMessageId = chat.messages[chat.messages.length - 1]._id;
                sendDataToReceipient(req.body.sentBy, req.body.room, req.body.message, newMessageId)
            } else {

                let participants_list = req.body.participants.split(',')
                const user = await new User({
                    "username": req.body.groupName,
                    "phone": req.body.groupName,
                    "group": true,
                    "participants": participants_list,
                    "profile": req.body.groupName,
                    "status": "Group Chat",
                })
                await user.save()
                chat = new Chat({
                    "participants": participants_list,
                    "isGroup": true,
                    "groupName": req.body.groupName,
                    "creator": req.body.creator,
                })
            }
            // console.log('chat', chat)
            await chat.save()
            res.status(200).json({ msg: "message sent successfully" })
        } else {
            res.status(500).json({
                msg: `Server Error:${error}`
            })
        }

    } catch (error) {
        console.log("eroor createGroup", error)
        res.status(500).json({
            msg: `Server Error:${error}`
        })
    }
}

async function sendDataToReceipient(sender, room, message, mid) {
    console.log("paritcipants send d to rec", room, sender)
    const socketio = getInstanceIo()
    message.timestamp = new Date()
    message._id = mid
    let profile = await User.findOne({ "_id": sender }).select({ "profile": 1, "username": 1 })
    console.log("profile", profile)
    message.profile = profile.profile
    message.username = profile.username
    // console.log("sendDataToReceipient", socketio)
    // socketio.emit("welcome", "Socket from chat responding")
    socketio.to(room).emit('roomMessage', { message, room, profile })
}
module.exports = createGroup
