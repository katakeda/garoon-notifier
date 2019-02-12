chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed!");
})

chrome.runtime.onMessage.addListener((request, sender, response) => {
    console.log(request);
    console.log(sender);
    console.log(response);
})