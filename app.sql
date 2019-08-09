DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
id INTEGER(10) AUTO_INCREMENT NOT NULL,
product_name varchar(100) NOT NULL,
department_name varchar(100) NULL,
price DECIMAL(10,4) NOT NULL,
stock_quantity INTEGER(10) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (1, "tomatoes", "produce", 1.00, 100);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (2, "potatoes", "produce", 2.00, 87);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (3, "pairs", "produce", 3.00, 14);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (4, "toothbrush", "hygiene", 1.00, 24);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (5, "comb", "hygiene", .50, 14);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES(6, "walnuts", "produce", .25, 2000);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (7, "apples", "produce", .30, 100);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (8, "oranges", "produce", .75, 38);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (9, "peanuts", "produce", .10, 50);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (10, "mouthwash", "hygiene", 4.00, 12);