const API_BASE_URL = "https://dragon-guard-app.vercel.app";

// Server Health
document.getElementById("check-btn").addEventListener("click", async () => {
  const out = document.getElementById("status-output");
  out.textContent = "Checking...";
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`);
    const data = await res.json();
    out.textContent = `${data.status}: ${data.message}`;
  } catch {
    out.textContent = "Error connecting to backend.";
  }
});

// Password Checker
document.getElementById("pass-btn").addEventListener("click", async () => {
  const password = document.getElementById("pass-input").value;
  const out = document.getElementById("pass-output");
  const res = await fetch(`${API_BASE_URL}/api/check-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password })
  });
  const data = await res.json();
  out.textContent = `Strength: ${data.strength} (Score: ${data.score}/5)`;
});

// Header Inspector
document.getElementById("header-btn").addEventListener("click", async () => {
  const url = document.getElementById("header-input").value;
  const out = document.getElementById("header-output");
  out.textContent = "Scanning...";
  const res = await fetch(`${API_BASE_URL}/api/analyze-headers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });
  const data = await res.json();
  out.textContent = JSON.stringify(data, null, 2);
});

// URL Scanner
document.getElementById("url-btn").addEventListener("click", async () => {
  const url = document.getElementById("url-input").value;
  const out = document.getElementById("url-output");
  out.textContent = "Scanning...";
  const res = await fetch(`${API_BASE_URL}/api/scan-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });
  const data = await res.json();
  out.textContent = JSON.stringify(data, null, 2);
});