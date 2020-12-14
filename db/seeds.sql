USE employee_db;

INSERT INTO departments(name) 
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO roles(title, salary, department_id)
VALUES 
("Sales Lead", 80000, 1),
("Salesperson", 60000, 1),
("Lead Engineer", 125000, 2),
("Software Engineer", 100000, 2),
("Accountant", 90000, 3),
("Lawyer", 100000, 4),
("Legal Team Lead", 120000, 4);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", 1, 3),
("Mike", "Chan", 1, 1),
("Ashley", "Rodriguez", 2, NULL),
("Kevin", "Tupik", 2, 1),
("Malia", "Brown", 3, NULL),
("Sarah", "Lourd", 4, NULL),
("Tom", "Allen", 4, 7),
("Tammer", "Galal", 2, 4)