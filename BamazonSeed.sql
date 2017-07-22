-- use following command to seed mysql
-- mysql -u root < nameoffile.mysql
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(75) NULL,
  department VARCHAR(30) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT(5) NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (name, department, price, stock_quantity)
VALUES
('Unsullied Helm', 'unsullied', 300, 5000),
('Unsullied Armor', 'unsullied', 700, 5000),
('Unsullied Shield', 'unsullied', 200, 5000),
('Unsullied Spear', 'unsullied', 450, 3000),
('Direwolf', 'accessories', 5000, 5),
('Dragon', 'accessories', 9000, 3),
('Golden Hand', 'accessories', 3000, 1),
('Flaming Sword', 'accessories', 200, 100),
('Valyrian Sword', 'valyrian', 950, 500),
('Valyrian Dagger', 'valyrian', 775, 425),
('Valyrian Hammer', 'valyrian', 1300, 250),
('Valyrian Axe', 'valyrian', 1275, 325);
