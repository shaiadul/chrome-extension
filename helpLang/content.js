const apiUrl = 'https://api.mymemory.translated.net/get';

document.addEventListener('mouseup', function () {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 1) {
        fetch(`${apiUrl}?q=${encodeURIComponent(selectedText)}&langpair=en|bn`)
        .then(response => response.json())
        .then(data => {
            const translation = data.responseData.translatedText || "Translation not available";
            const range = window.getSelection().getRangeAt(0);
            const rect = range.getBoundingClientRect();
            showTooltip(rect.left + window.scrollX, rect.bottom + window.scrollY, translation);
        })
        .catch(error => console.error('Error fetching translation:', error));
    }
});

function showTooltip(x, y, message) {
  const tooltip = document.createElement('div');
  tooltip.style.position = 'absolute';
  tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  tooltip.style.color = 'white';
  tooltip.style.padding = '5px';
  tooltip.style.borderRadius = '5px';
  tooltip.style.zIndex = '10000';
  tooltip.innerText = message;
  document.body.appendChild(tooltip);

  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;

  setTimeout(() => {
      document.body.removeChild(tooltip);
  }, 2000);
}
