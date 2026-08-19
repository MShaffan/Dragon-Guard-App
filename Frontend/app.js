const API_BASE_URL = "https://dragon-guard-app.vercel.app";

const checkBtn = document.getElementById("check-btn");
const statusOutput = document.getElementById("status-output");

checkBtn.addEventListener("click", async () => {
  statusOutput.textContent = "Checking server status...";
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    const data = await response.json();
    
    statusOutput.textContent = `Server Status: ${data.status} - ${data.message}`;
    statusOutput.style.color = "green";
  } catch (error) {
    statusOutput.textContent = "Error connecting to backend server.";
    statusOutput.style.color = "red";
    console.error("Fetch Error:", error);
  }
});