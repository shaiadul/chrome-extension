document
  .getElementById("downloadImages")
  .addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: downloadImages,
    });
  });

document.getElementById("downloadSpecs").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: downloadSpecs,
  });
});

function downloadImages() {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    const src = img.src || img.dataset.src;
    if (src) {
      chrome.runtime.sendMessage({ url: src });
    }
  });
}

// function downloadSpecs() {
//     const possibleTables = [
//         document.querySelector('#product-spec-table'),
//         document.querySelector('#product-attribute-specs-table'),
//         document.querySelector('#tproduct-spec-fr'),
//         document.querySelector('.jsx-2030750473'),
//         document.querySelector('.data-table'),
//         document.querySelector('.data'),
//         document.querySelector('.additional-attributes'),
//         document.querySelector('.specs-table'),
//         document.querySelector('.product-specifications'),
//         document.querySelector('.table'),
//         document.querySelector('table'),
//     ].filter(Boolean);

//     if (possibleTables.length === 0) {
//         alert('No specification table found!');
//         return;
//     }

//     const table = possibleTables[0];

//     let csv = [];
//     const rows = table.querySelectorAll('tr');

//     rows.forEach((row) => {
//         const cols = row.querySelectorAll('td, th');
//         const data = Array.from(cols).map(col => col.innerText);
//         csv.push(data.join(','));
//     });

//     const csvString = csv.join('\n');
//     const blob = new Blob([csvString], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);

//     chrome.runtime.sendMessage({ url: url, filename: 'specifications.csv' });
// }

function downloadSpecs() {
  const possibleTables = [
    document.querySelector("#product-spec-table"),
    document.querySelector("#product-attribute-specs-table"),
    document.querySelector("#tproduct-spec-fr"),
    document.querySelector(".jsx-2030750473"),
    document.querySelector(".data-table"),
    document.querySelector(".data"),
    document.querySelector(".additional-attributes"),
    document.querySelector(".specs-table"),
    document.querySelector(".product-specifications"),
    document.querySelector(".table"),
  ].filter(Boolean);

  const allTables = document.querySelectorAll("table");

  const tables = [...possibleTables, ...Array.from(allTables)];

  if (tables.length === 0) {
    alert("No specification table found!");
    return;
  }

  let csv = [];

  tables.forEach((table) => {
    const rows = table.querySelectorAll("tr");

    rows.forEach((row) => {
      const cols = row.querySelectorAll("td, th");
      const data = Array.from(cols).map((col) => col.innerText.trim());
      csv.push(data.join(","));
    });
  });

  const csvString = csv.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  chrome.runtime.sendMessage({ url: url, filename: "specifications.csv" });
}
