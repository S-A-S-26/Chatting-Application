const Chat = require("../model/chat")

async function addSeenStatusOffline(req, res) {
    console.log("addSeenStatusOffline func exec", req.body)
    try {
        const { chatId, messageIds } = req.body; // chatId and array of message _ids
        console.log("mesageIds", messageIds)
        // Update all messages that belong to the specified chat and have their _id in the messageIds array
        // const bupd = await Chat.find({
        //     _id: chatId,
        //     "messages._id": { $in: messageIds },
        // })
        // console.log("bupd", bupd)
        // const chat = await Chat.updateMany(
        //     {
        //         _id: chatId,
        //         "messages._id": { $in: messageIds },
        //     }, // Match message _id and chatId
        //     { $set: { "messages.$[elem].seen": true } }, // Set the seen field to true for all matched messages
        //     { arrayFilters: [{ "elem._id": { $in: messageIds } }] } // Set the seen field to true
        // );
        for (const id of messageIds) {
            const chat = await Chat.updateOne({
                _id: chatId,
                "messages._id": id,
            }, {
                $set: {
                    "messages.$.seen": true,
                }
            })
            console.log("chat", chat)
        }

        res.status(200).json({ message: 'Messages marked as seen' });
    } catch (error) {
        res.status(500).json({ message: "Server Error :" + error })
    }
}

module.exports = addSeenStatusOffline
