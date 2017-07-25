-- use following command to seed mysql
-- mysql -u root < nameoffile.mysql
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE departments(
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(75) NULL,
  over_head_cost INT(15) NULL,
  PRIMARY KEY (id)
);

INSERT INTO departments (department_name, over_head_cost)
VALUES
('unsullied', 5000),
('accessories', 20000),
('valyrian', 7500);

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(75) NULL,
  department VARCHAR(30) NULL,
  price INT(10) NULL,
  inventory INT(5) NULL,
  product_sales INT(20) NULL
  PRIMARY KEY (id)
);

INSERT INTO products (name, department, price, inventory, product_sales)
VALUES
('Unsullied Helm', 'unsullied', 300, 5000, 0),
('Unsullied Armor', 'unsullied', 700, 5000, 0),
('Unsullied Shield', 'unsullied', 200, 5000, 0),
('Unsullied Spear', 'unsullied', 450, 3000, 0),
('Direwolf', 'accessories', 5000, 6, 0),
('Dragon', 'accessories', 9000, 3, 0),
('Golden Hand', 'accessories', 3000, 5, 0),
('Flaming Sword', 'accessories', 2000, 100, 0),
('Valyrian Sword', 'valyrian', 950, 500, 0),
('Valyrian Dagger', 'valyrian', 775, 425, 0),
('Valyrian Hammer', 'valyrian', 1300, 250, 0),
('Valyrian Axe', 'valyrian', 1275, 325, 0);
