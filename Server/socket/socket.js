
function initiateSocket(io) {
    io.on('connection', (socket) => {
        console.log("Socket running sucessfully", socket.id)
    })
}

module.exports = initiateSocket
