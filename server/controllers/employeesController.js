import { getAllEmployees, getEmployeeById, addEmployee } from "../models/employeeModel.js";

export async function showAllEmployees(req, res) {
    try {
        const employees = await getAllEmployees();
        res.json(employees); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function showEmployee(req, res) {
    try {
        const employee = await getEmployeeById(req.params.id);
        if (!employee) return res.status(404).json({ error: "Сотрудник не найден" });
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export async function createEmployee(req, res) {
    try {
        const { name, position, salary } = req.body;
        const id = await addEmployee(name, position, salary);
        res.status(201).json({ id }); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
