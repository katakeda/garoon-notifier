const io = require("socket.io-client");
const socket = io("http://localhost:8000");
socket.on("notification", (data) => {
    alert(`${data.user}: ${data.event.subject}`);
})

async function submit()
{
    try {
        const user = document.getElementById("user").value;
        const password = document.getElementById("password").value;
        const data = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({user: user, password: password})
        };
        const response = await fetch("http://localhost:8000/api/getGaroonEvents", data);
        const result = await response.json();
        if (!result.success) {
            alert(result.error.message);
            return false;
        }

        socket.emit("login", {user: user, events: result.events});
        window.location.reload();
    } catch (error) {
        alert(error);
    }
}

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", submit);