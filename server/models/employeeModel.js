import { db } from "./db.js"; 

export async function getAllEmployees() {
    const [rows] = await db.query("SELECT * FROM employees");
    return rows;
}

export async function getEmployeeById(id) {
    const [rows] = await db.query("SELECT * FROM employees WHERE id = ?", [id]);
    return rows[0]; 
}

export async function addEmployee(name, position, salary) {
    const [result] = await db.query(
        "INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)",
        [name, position, salary]
    );
    return result.insertId;
}
