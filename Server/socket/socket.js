
function initiateSocket(io) {
    io.on('connection', (socket) => {
        console.log("Socket running sucessfully", socket.id)
        socket.emit("welcome", `Welcome to socket : ${socket.id}`)
    })
}

module.exports = initiateSocket
