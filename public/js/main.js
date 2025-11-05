const tableBody = document.querySelector("#employees-table tbody");
const form = document.getElementById("add-employee-form");

async function loadEmployees() {
    const res = await fetch("/api/employees");
    const employees = await res.json();
    tableBody.innerHTML = "";
    employees.forEach(emp => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.position}</td>
            <td>${emp.salary}</td>
        `;
        tableBody.appendChild(tr);
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById("name").value,
        position: document.getElementById("position").value,
        salary: document.getElementById("salary").value
    };
    await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    form.reset();
    loadEmployees(); 
});

loadEmployees();
