class SocketController
{
    constructor() {}

    handleConnection(socket)
    {
        socket.on("update", (data) => {
            console.log(data);
            socket.broadcast.emit("update", {success: true});
        })
    }
}

module.exports = new SocketController();