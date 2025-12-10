document.getElementById("reg-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Generate random 3-letter code
    function genCode() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return (
            letters[Math.floor(Math.random() * 26)] +
            letters[Math.floor(Math.random() * 26)] +
            letters[Math.floor(Math.random() * 26)]
        );
    }

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const symptoms = document.getElementById("symptoms").value.trim();
    const pain = parseInt(document.getElementById("pain").value);

    const code = genCode();
    const severity = pain;

    const res = await fetch("/api/patient/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age, symptoms, code, severity })
    });

    const data = await res.json();

    if (data.success) {
        alert(`Check-In Complete!\nYour patient code is: ${code}`);
        window.location = "/patient-login.html";
    } else {
        alert("Registration failed.");
    }
});
