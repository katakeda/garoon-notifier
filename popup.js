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

        const garoonLogin = document.getElementById("garoon-login");
        const eventsList = document.getElementById("events-list");
        const element = document.createElement("ul");
        for (const event of result.events) {
            const date = new Date(event.start.dateTime);
            const list = document.createElement("li");
            list.setAttribute("style", "font-size:12px");
            list.innerHTML = `${date.toDateString()}: ${event.eventMenu} ${event.subject}`;
            element.append(list);
        }
        eventsList.append(element);

        localStorage.setItem("garoonEvents", eventsList.innerHTML);
        localStorage.setItem("garoonUser", user);
        chrome.runtime.sendMessage({message: "login"});
        socket.emit("login", {user: user, company: company, events: result.events});

        window.location.reload();
    } catch (error) {
        alert(error);
    }
}

// Register handler for submit button
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", submit);

// Replace popup content if logged in
if (localStorage.getItem("garoonUser")) {
    const garoonLogin = document.getElementById("garoon-login");
    const eventsList = document.getElementById("events-list");
    eventsList.innerHTML = localStorage.getItem("garoonEvents");
    eventsList.style.display = "block";
    garoonLogin.style.display = "none";
}