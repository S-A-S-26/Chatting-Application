const online = new Object
let socketio;
console.log("socket file ran online newly assigned")
function deleteKeysByValue(obj, valueToDelete) {
    console.log("deletekeyby value", online)
    for (const key in obj) {
        if (obj[key] === valueToDelete) {
            delete obj[key];
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