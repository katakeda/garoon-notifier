class SocketController
{
    constructor() {}

    handleConnection(socket)
    {
        socket.on("login", (data) => {
            const user = data.user;
            const company = data.company;
            const events = data.events;
            for (const event of events) {
                const time = Date.parse(event.start.dateTime);
                setTimeout(() => {
                    socket.broadcast.emit("notification", {user: user, company: company, event: event});
                }, time - Date.now());
            }
        })
    }
}

module.exports = new SocketController();