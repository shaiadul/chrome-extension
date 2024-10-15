document.getElementById("postComment").addEventListener("click", () => {
  const postLink = document.getElementById("postLink").value;

  if (!postLink) {
    alert("Please enter a valid Facebook post link.");
    return;
  }

  chrome.tabs.create({ url: postLink }, (tab) => {
    setTimeout(() => {
      chrome.tabs.sendMessage(tab.id, { action: "postComment" });
    }, 3000);
  });
});
