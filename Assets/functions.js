//Function that views all employees in a table form
async function viewAllEmployees() {

    const eQuery = `SELECT employees.first_name, employees.last_name,
    roles.title, roles.salary, departments.name,
    IFNULL(CONCAT(manager.first_name, ' ', manager.last_name),'N/A') AS 'Manager'
    FROM employees
    LEFT JOIN employees manager ON manager.id = employees.manager_id
    INNER JOIN roles ON employees.role_id = roles.id
    INNER JOIN departments ON roles.department_id = departments.id;`;

    const eData = await connection.query(eQuery);
    console.table(eData);

    init();
}

//Function that views all roles in a table form
async function viewAllRoles() {
    const rQuery = `SELECT title AS Title, salary AS Salary, name AS Department FROM roles
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

    const allRoles = await connection.query('SELECT title, id FROM roles');

    const allEmployees = await connection.query('SELECT CONCAT(first_name, " ", last_name) AS name, id FROM employees')

    const employee = await inquirer.prompt([
        {
            name: 'first_name',
            message: "Enter the employee's first name?"
        },
        {
            name: 'last_name',
            message: "Enter the employee's last name?"
        },
        {
            name: 'role',
            type: 'list',
            message: "What is the employee's role?",
            choices: allRoles.map((r) => ({
                name: r.title,
                value: r.id
            }))
        },
        {
            name: 'manager',
            type: 'list',
            message: "What is the employee's manager?",
            choices: allEmployees.map((e) => ({
                name: e.name,
                value: e.id
            }))
        }
    ]);


    const addEquery = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?) ";

    await connection.query(addEquery, [employee.first_name, employee.last_name, employee.role, employee.manager]);

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
            type: 'list',
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
    const newDepartment = await inquirer.prompt([
        {
            name: 'department_name',
            message: "What is the name of the department?"
        }
    ]);

    const addDquery = "INSERT INTO departments (name) VALUES (?)";

    await connection.query(addDquery, [newDepartment.department_name]);

    console.log("Department has been added.");

    init();
}

// Function that allows user to remove an employee
async function removeEmployee() {
    const allEmployees = await connection.query('SELECT CONCAT(first_name, " ", last_name) AS name, id FROM employees')

    const employee = await inquirer.prompt([
        {
            name: "name",
            type: "list",
            message: "Which employee would you like to remove?",
            choices: allEmployees.map((employee) => ({
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
    const allRoles = await connection.query('SELECT title, id FROM roles');

    const role = await inquirer.prompt([
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

    const department = await inquirer.prompt([
        {
            name: "name",
            type: "list",
            message: "Which department would you like to remove?",
            choices: allDepartments.map((department) => ({
                name: department.name,
                value: department.id
            }))
        }
    ]);

    const removeDquery = "DELETE FROM departments WHERE id = ?";

    await connection.query(removeDquery, [department.name]);

    console.log("department has been deleted.");

    init();
}

async function updateEmployeeRole() {
    const allRoles = await connection.query('SELECT title, id FROM roles');

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
                name: role.title,
                value: role.id
            }))
        }
    ])

    const updatedRquery = 'UPDATE employees SET role_id = ? WHERE id = ?';
    
    await connection.query(updatedRquery, [updatedEmployee.r_title, updatedEmployee.e_name])

    console.log("Employee's role has been updated.")

    init();
}