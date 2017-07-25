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
  inquirer.prompt([
    {
      name: 'departmentName',
      type: 'input',
      message: 'Please enter the new department name:'
    },
    {
      name: 'overHeadCost',
      type: 'input',
      validate: function(value){
        return !isNaN(value);
      },
      message: 'What is the over head cost of this department?'
    }
  ]).then(function(answer){
    connection.query('INSERT INTO departments SET ?', {
      department_name: answer.departmentName,
      over_head_cost: answer.overHeadCost
    }, function(err, res) {
      console.log(res.affectedRows + ' new department created \n');
      start();
    })
  })
}

   // * View Product Sales by Department
function departmentSales() {
  console.log('department sales is working\n');
  start();
}