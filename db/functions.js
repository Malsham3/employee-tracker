async function viewAllEmployees() {

    const query = `SELECT 
    employees.first_name AS 'First Name', employees.last_name AS 'Last Name',
    roles.title AS 'Title', roles.salary AS 'Salary', 
    departments.name AS 'Department',
    IFNULL(CONCAT(m.first_name, ' ', m.last_name),'N/A') AS 'Manager'
    FROM employee e
    LEFT JOIN employee m ON m.id = e.manager_id
    INNER JOIN role ON e.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    ORDER BY manager DESC;`;
}