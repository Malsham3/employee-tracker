USE employee_db

INSERT INTO department(name) 
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO role(title, salary, department_id)
VALUES 
("Sales Lead", 80000, 1),
("Salesperson", 60000, 1),
("Lead Engineer", 125000, 2),
("Software Engineer", 100000, 2),
("Accountant", 90000, 3),
("Lawyer", 100000, 4),
("Legal Team Lead", 120000, 4);

-- INSERT INTO EMPLOYEES HERE :)