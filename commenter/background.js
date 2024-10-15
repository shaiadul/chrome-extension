chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed!");
});


// Listen for notifications from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "notify") {
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icon16.png",
            title: "Facebook Comment Automation",
            message: request.message,
            priority: 2
        });
    }
});
