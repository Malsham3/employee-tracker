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
            "View all departments",
            "Add a department",
            "Add a Role",
            "Add an Employee",


        ]
    })
}