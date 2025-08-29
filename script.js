// Counters
let heartCount = 0; 
let coinCount = 100;
let copyCount = 0;

// DOM Elements
const heartCountEl = document.getElementById("heartCount");
const coinCountEl = document.getElementById("coinCount");
const copyCountEl = document.getElementById("copyCount");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");

// Initial history to match the image
const initialHistory = [
  { serviceName: "Fire Service Number", number: "999", time: "4:02:13 AM" },
  {
    serviceName: "National Emergency Number",
    number: "999",
    time: "4:02:17 AM",
  },
];

// Function to render history from an array
function renderHistory() {
  historyList.innerHTML = ""; 
  initialHistory.forEach((item) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center p-2 bg-gray-100 rounded";
    li.innerHTML = `
        <div>
            <h4 class="font-semibold text-gray-800">${item.serviceName}</h4>
            <p class="text-xs text-gray-500">${item.number}</p>
        </div>
        <span class="text-xs text-gray-400">${item.time}</span>
    `;
    historyList.appendChild(li);
  });
}

// Initial render
renderHistory();

// Heart button
document.querySelectorAll(".heart-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    heartCount++;
    heartCountEl.textContent = heartCount;
  });
});

// Copy button
document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    const number = card.querySelector(".service-number").textContent;
    navigator.clipboard.writeText(number);
    copyCount++;
    copyCountEl.textContent = copyCount;
    alert(`Copied: ${number}`);
  });
});

// Call button
document.querySelectorAll(".call-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    const serviceName = card.querySelector("h3").textContent;
    const number = card.querySelector(".service-number").textContent;

    if (coinCount < 20) {
      alert("Not enough coins to make a call!");
      return;
    }

    coinCount -= 20;
    coinCountEl.textContent = coinCount;
    alert(`Calling ${serviceName} (${number})`);

    // Add to history
    const time = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    // Add new history item to the front of the array
    initialHistory.unshift({ serviceName, number, time });

    // Re-render the history list
    renderHistory();
  });
});

// Clear history
clearHistoryBtn.addEventListener("click", () => {
  initialHistory.length = 0; // Clear the array
  renderHistory();
});