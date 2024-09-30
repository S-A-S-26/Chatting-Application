
function initiateSocket(io) {
    io.on('connection', (socket) => {
        console.log("Socket running sucessfully", socket.id)
        socket.emit("welcome", `Welcome to socket : ${socket.id}`)
        socket.broadcast.emit("welcome", `User ${socket.id} is online`)
        socket.on('disconnect', () => {
            console.log("Socket Disconnected", socket.id)
            socket.broadcast.emit("welcome", `Socket has left : ${socket.id}`)
        })
    })

}

module.exports = initiateSocket
