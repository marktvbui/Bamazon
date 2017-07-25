var inquirer = require('inquirer');
var mysql = require('mysql');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  console.log('connection to mothership confirmed, you are ready to go!');
  start();
});

   // * View Product Sales by Department
   
   // * Create New Department

function start(){
  connection.query('SELECT * FROM products', function(err, results) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: 'selection',
        type: 'list',
        choices: ['View Sales by Departments', 'Create New Department', 'Quit'],
        message: 'What would you like to do?'
      }
    ])
    .then(function(answer){
      switch (answer.selection){
        case 'View Sales by Departments':
        departmentSales();
        break;

        case 'Create New Department':
        createDepartment();
        break;

        case 'Quit':
        console.log('Later Alligator');
        connection.end();
        break;
      }
    })
  })
}

function createDepartment() {
  console.log('create department works\n');
  start();
}

function departmentSales() {
  console.log('department sales is working\n');
  start();
}