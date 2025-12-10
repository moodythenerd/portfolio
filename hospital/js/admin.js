async function loadPatients() {
    const res = await fetch("/api/patients");
    const patients = await res.json();

    const tbody = document.querySelector("#patients-table tbody");
    tbody.innerHTML = "";

    patients.forEach((p) => {
        const row = document.createElement("tr");

        const sevBadge =
            p.severity === 3 ? "badge badge-high" :
                p.severity === 2 ? "badge badge-med" :
                    "badge badge-low";

        row.innerHTML = `
            <td>${p.name}</td>
            <td>${p.code}</td>
            <td><span class="${sevBadge}">${p.severity}</span></td>
            <td>${new Date(p.arrival_time).toLocaleString()}</td>
            <td><button class="btn-small btn" onclick="treatPatient(${p.id})">Treat</button></td>
        `;

        tbody.appendChild(row);
    });
}

async function treatPatient(id) {
    await fetch(`/api/patients/${id}/treat`, { method: "POST" });
    loadPatients();
}

loadPatients();
