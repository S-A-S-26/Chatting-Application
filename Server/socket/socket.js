const online = new Object
let socketio;

const markLastOnline = require('../controller/markLastOnline')
const addSeenStatus = require('../controller/addSeenStatus')

console.log("socket file ran online newly assigned")
function deleteKeysByValue(obj, valueToDelete) {
    console.log("deletekeyby value", online)
    for (const key in obj) {
        if (obj[key] === valueToDelete) {
            delete obj[key];
            markLastOnline(key)
        }
    }
    console.log("online after del", online)
}

function initiateSocket(io) {
    socketio = io
    function sendOnlineStatuses(socket) {
        socket.broadcast.emit("user_online_status", online)
    }

    io.on('connection', (socket) => {
        console.log("Socket running sucessfully", socket.id)

        socket.emit("welcome", `Welcome to socket : ${socket.id}`)

        socket.broadcast.emit("online", `User ${socket.id} is online`)

        socket.on('log_user', (val) => {
            console.log("log_user", val)
            Object.assign(online, val);
            console.log("online after upd", online)
            sendOnlineStatuses(socket)
        })

        socket.on('remove_user', (val) => {
            console.log("remove user", val)
            delete online[val]
            console.log("online after del", online)
        })

        socket.on('seenstatus', (val) => {
            console.log("seenstatus socket call")
            addSeenStatus(val, socket, online[val.receiver_id])
        })

        socket.on('unseenCount', (val) => {
            console.log("unseen Count", val)
            socket.to(online[val.id]).emit("addCountUnseen", val.sender)
        })

        socket.on('joinRoom', (val) => {
            console.log("join room", val, socket.id)
            console.log("socket id", socket.id)
            socket.join(val)
        })

        socket.on('disconnect', () => {
            console.log("Socket Disconnected", socket.id)
            deleteKeysByValue(online, socket.id)
            sendOnlineStatuses(socket)
            socket.broadcast.emit("welcome", `Socket has left : ${socket.id}`)
            socket.removeAllListeners();
        })

    })

}

module.exports = { initiateSocket, online, getInstanceIo: () => socketio }
