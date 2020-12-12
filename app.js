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
            "Remove a Department"
        ]
    })
}