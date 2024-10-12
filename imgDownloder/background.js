chrome.runtime.onMessage.addListener((request) => {
    if (request.url) {
        chrome.downloads.download({ url: request.url, filename: request.filename });
    }
});
