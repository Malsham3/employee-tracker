const connection = require ('./db/connection');
const inquirer = require('inquirer');
const mysql = require('mysql')

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
            "Exit"
        ]
    })

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

        case "Exit":
        process.exit(0);
    }
}