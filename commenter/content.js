const randomComments = [
  "Great post!",
  "Interesting read!",
  "Awesome!",
  "Loved this!",
  "Well said!",
  "Nice insights!",
  "Very helpful!",
  "Thanks for sharing!",
  "Would love to read more!",
  "Can't wait to see more like this!",
];

let count = 3;
const intervalTime = 10000;

async function findCommentBoxAndPost() {
  const commentBox = document.querySelector(
    'div.xzsf02u[contenteditable="true"][role="textbox"]'
  );
  console.log(commentBox);

  const submitButton = document.querySelector(
    'div[role="button"][aria-label="Comment"]'
  );

  if (commentBox) {
    const randomComment =
      randomComments[Math.floor(Math.random() * randomComments.length)];

    commentBox.focus();

    commentBox.innerHTML = `<span data-lexical-text="true">${randomComment}</span>`;

    console.log(`Posting comment: "${randomComment}"`);

    const inputEvent = new Event("input", { bubbles: true });
    commentBox.dispatchEvent(inputEvent);

    setTimeout(() => {
      if (submitButton && !submitButton.hasAttribute("aria-disabled")) {
        submitButton.click();
        console.log(`Comment submitted: "${randomComment}"`);

        count -= 1;
        if (count <= 0) {
          clearInterval(loop);
          console.log("Finished posting comments.");
        }
      } else {
        console.log("Submit button is disabled. Retrying...");
      }
    }, 2000);
  } else {
    console.log("Comment box or submit button not found. Retrying...");
  }
}

const loop = setInterval(findCommentBoxAndPost, intervalTime);
