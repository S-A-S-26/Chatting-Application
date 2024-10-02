let online = new Object

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
    io.on('connection', (socket) => {
        console.log("Socket running sucessfully", socket.id)

        socket.emit("welcome", `Welcome to socket : ${socket.id}`)

        socket.broadcast.emit("online", `User ${socket.id} is online`)

        socket.on('log_user', (val) => {
            console.log("log_user", val)
            online = { ...online, ...val }
            console.log("online after upd", online)
        })

        socket.on('remove_user', (val) => {
            console.log("remove user", val)
            delete online[val]
            console.log("online after del", online)
        })

        socket.on('disconnect', () => {
            console.log("Socket Disconnected", socket.id)
            deleteKeysByValue(online, socket.id)
            socket.broadcast.emit("welcome", `Socket has left : ${socket.id}`)
            socket.removeAllListeners();
        })
    })

}

module.exports = initiateSocket
