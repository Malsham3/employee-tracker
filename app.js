const connection = require ('./db/connection');
const inquirer = require('inquirer');
const mysql = require('mysql');
const { registerPrompt } = require('inquirer');

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
    });

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
    };
}

init();

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
    ON roles.department_id = departments.id`;

    const rData = await connection.query(rQuery);
    console.table(rData);
    init();
}

//Function that views all departments in a table form
async function viewAllDepartments() {
    const dQuery = 'SELECT name AS Name FROM departments';

    const dData = await connection.query(dQuery);
    console.table(dData);
    init();
}

//Function that adds a new employee
async function addEmployee() {

    const employee = await inquirer.prompt([
        {
            name: 'first_name',
            message: "Enter the employee's first name"
        },
        {
            name: 'last_name',
            message: "Enter the employee's last name"
        },
        {
            name: 'role',
            message: "Enter the employee's role"
        }
    ]);

    const addEquery = "INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?) ";

    await connection.query(addEquery, [employee.first_name, employee.last_name, employee.role]);

    console.log("Employee has been added.");

    init();
}

//Function that adds a new Role
async function addRole() {
    const allDepartments = await connection.query('SELECT name, id FROM departments');

    const role = await inquirer.prompt([
        {
            name: 'title',
            message: "What is the title of the role?"
        },
        {
            name: 'salary',
            message: "What is the salary for this role?"
        },
        {
            name: 'department',
            message: "Which department is this role in?",
            choices: allDepartments.map((department) => ({
                name: department.name,
                value: department.id,
            }))
        }
    ]);

    const addRquery = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?) ";

    const addRdata = await connection.query(addRquery, [role.title, role.salary, role.department]);

    console.log("Role has been added.");

    init();
}

//Function that adds a new department
async function addDepartment() {
    const viewAllDepartments = await inquirer.prompt([
        {
            name: 'department_title',
            message: "What is the title of the role?"
        }
    ]);

    const addDquery = "INSERT INTO departments (name) VALUES (?)";

    await connection.query(addDquery, [department.department_title]);

    console.log("Department has been added.");

    init();
}

// Function that allows user to remove an employee
async function removeEmployee() {
    const allEmployees = await connection.query('SELECT CONCAT(first_name, " ", last_name) AS name, id FROM employees')

    const employee = await prompt([
        {
            name: "name",
            type: "list",
            message: "Which employee would you like to remove?",
            choices: allEmplpoyees.map((employee) => ({
                name: employee.name,
                value: employee.id
            }))
        }
    ]);

    const removeEquery = "DELETE FROM employees WHERE id = ?";

    await connection.query(removeEquery, [employee.name]);

    console.log("Employee has been deleted.")

    init();
}

// Function that allows user to remove a role
async function removeRole() {
    const allRoles = await connection.query('SELECT title, id FROM role');

    const role = await prompt([
        {
            name: "name",
            type: "list",
            message: "Which role would you like to remove?",
            choices: allRoles.map((role) => ({
                name: role.title,
                value: role.id
            }))
        }
    ]);

    const removeRquery = "DELETE FROM roles WHERE id = ?";

    await connection.query(removeRquery, [role.name]);

    console.log("Role has been deleted.");

    init();
}

// Function that allows user to remove a department
async function removeDepartment() {
    const allDepartments = await connection.query('SELECT name, id FROM departments')

    const department = await prompt([
        {
            name: "name",
            type: "list",
            message: "Which department would you like to remove?",
            choices: allDepartments.map((department) => ({
                name: department.name,
                value: depratment.id
            }))
        }
    ]);

    const removeDquery = "DELETE FROM departments WHERE id = ?";

    await connection.query(removeDquery, [department.name]);

    console.log("department has been deleted.");

    init();
}

async function updateEmployeeRole() {
    const allRoles = await connection.query('SELECT title, id FROM role');

    const allEmployees = await connection.query('SELECT CONCAT(first_name, " ", last_name) AS name, id FROM employees');

    const updatedEmployee = await inquirer.prompt([
        {
            name: "e_name",
            type: "list",
            message: "Which employee?",
            choices: allEmployees.map((employee) => ({
                name: employee.name,
                value: employee.id,
            })),
        },
        {
            name: "r_title",
            type: "list",
            message: "What role will this employee have?",
            choices: allRoles.map((role) => ({
                name: role.tile,
                value: role.id
            }))
        }
    ])

    const updatedRquery = 'UPDATE employees SET role_id = ? WHERE id = ?';
    
    await connection.query(updatedRquery, [updatedEmployee.e_name, updatedEmployee.r_title])

    console.log("Employee's role has been updated.")

    init();
}