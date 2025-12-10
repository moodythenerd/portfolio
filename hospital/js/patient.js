async function loadStatus() {
    const res = await fetch("/api/patient/status");
    const data = await res.json();

    const st = document.getElementById("status-text");
    const pos = document.getElementById("position-text");
    const eta = document.getElementById("eta-text");

    if (data.status === "waiting") {
        st.textContent = "You are still waiting.";
        pos.textContent = "Position in queue: " + data.position;
        eta.textContent = "Estimated wait: " + data.estimated_wait_minutes + " minutes";
    } else {
        st.textContent = "You have been treated.";
        pos.textContent = "";
        eta.textContent = "";
    }
}

document.getElementById("refresh-status-btn").addEventListener("click", loadStatus);

loadStatus();
