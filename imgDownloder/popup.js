document.getElementById('downloadImages').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: downloadImages,
    });
});

document.getElementById('downloadSpecs').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: downloadSpecs,
    });
});

function downloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
        const src = img.src || img.dataset.src;
        if (src) {
            chrome.runtime.sendMessage({ url: src });
        }
    });
}

function downloadSpecs() {
    const table = document.getElementById('product-spec-table');
    if (!table) {
        alert('Specification table not found!');
        return;
    }

    let csv = [];
    const rows = table.querySelectorAll('tr');

    rows.forEach((row) => {
        const cols = row.querySelectorAll('td, th');
        const data = Array.from(cols).map(col => col.innerText);
        csv.push(data.join(','));
    });

    const csvString = csv.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    chrome.runtime.sendMessage({ url: url, filename: 'specifications.csv' });
}
