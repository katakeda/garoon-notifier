class SocketController
{
    constructor() {}

    handleConnection(socket)
    {
        socket.on("login", (data) => {
            const user = data.user;
            const events = data.events;
            for (let key in events) {
                const event = events[key];
                const time = Date.parse(event.start.dateTime);
                setTimeout(() => socket.broadcast.emit("notification", {user: user, event: event}), time - Date.now());
            }
        })
    }
}

module.exports = new SocketController();