const connection = require ('./db/connection');
const inquirer = require('inquirer');
const mysql = require('mysql')

//initial prompts function
async function init() {
    const { choice } = await inquirer.prompt({
        name: "choice",
        type: "List",
        message: "What would you like to do ?",
        choices: [
            "View all Employees",
            "View all Roles",
            "View all Departments",
            "Add an Employee",
            "Add a Role",
            "Add a Department",
            "Remove an Employee",
            "Remove a Role",
            "Remove a Department",
            "Update Employee Role",
            "Exit"
        ]
    })

    // switch method used to retrieve user's choice.
    switch(choice) {
        case "View all Employees":
        return viewAllEmployees();

        case "View all Roles":
        return viewAllRoles();

        case "View all Departments":
        return viewAllDepartments();

        case "Add an Employee":
        return addEmployee();

        case "Add a Role":
        return addRole();

        case "Add a Department":
        return addDepartment();

        case "Remove an Employee":
        return removeEmployee();

        case "Remove a Role":
        return removeRole();

        case "Remove a Department":
        return removeDepartment();

        case "Update Employee Role":
        return updateEmployeeRole();

        case "Exit":
        process.exit(0);
    }
}

//Function that views all employees in a table form
async function viewAllEmployees() {

    const eQuery = `SELECT 
    employees.first_name AS 'First Name', employees.last_name AS 'Last Name',
    roles.title AS Title, roles.salary AS Salary, 
    departments.name AS Department,
    IFNULL(CONCAT(m.first_name, ' ', m.last_name),'N/A') AS 'Manager'
    FROM employee e
    LEFT JOIN employees m ON m.id = e.manager_id
    INNER JOIN roles ON e.role_id = roles.id
    INNER JOIN departments ON roles.department_id = departments.id`;

    const eData = await connection.query(eQuery);
    console.table(eData);

    init();
}

//Function that views all roles in a table form
async function viewAllRoles() {
    const rQuery = `SELECT title AS Title, salary AS Salary, name AS Name FROM roles
    INNER JOIN departments
    ON roles.department_id = departments.id`

    const rData = await connection.query(rQuery);
    console.table(rData);
    init();
}

//Function that views all departments in a table form
async function viewAllDepartments() {
    const dQuery = 'SELECT name AS Name FROM departments'

    const dData = await connection.query(dQuery);
    console.table(dData);
    init();
}