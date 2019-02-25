const io = require("socket.io-client");

// Register handler for notification
const socket = io("http://localhost:8000");
socket.on("notification", notification);

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

chrome.runtime.onMessage.addListener((request) => {
    console.log("Message received:", request);
    setTimeout(() => {
        localStorage.removeItem("garoonEvents");
        localStorage.removeItem("garoonUser");
    }, 1000*60*60)
})

chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed!");
})