const io = require("socket.io-client");
const socket = io("http://localhost:8000");

async function submit()
{
    try {
        const user = document.getElementById("user").value;
        const password = document.getElementById("password").value;
        const company = document.getElementById("company").value;
        const data = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({user: user, password: password, company: company})
        };
        const response = await fetch("http://localhost:8000/api/getGaroonEvents", data);
        const result = await response.json();
        if (!result.success) {
            alert(`${result.status} ${result.statusText}`);
            return false;
        }

        socket.emit("login", {user: user, company: company, events: result.events});
        window.location.reload();
    } catch (error) {
        alert(error);
    }
}

function notification(data)
{
    let facilities = "";
    for (const facility of data.event.facilities) {
        facilities += `\n${facility.name}`;
    }
    const title = "Garoon Notification";
    const message = data.event.eventMenu + data.event.subject + facilities;

    chrome.notifications.onClicked.addListener(() => {
        const url = `https://${data.company}.cybozu.com/g/schedule/view.csp?event=${data.event.id}`;
        chrome.tabs.create({url: url});
    })

    chrome.notifications.create({
        type: "basic",
        iconUrl: "logo.png",
        title: title,
        message: message,
    })
}

// Register handler for submit button
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", submit);

// Register handler for notification
socket.on("notification", notification);