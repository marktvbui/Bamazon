var inquirer = require("inquirer");
var mysql = require('mysql');
var purchaseId;
var purchaseQuantity;
var purchaseItem;

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
  console.log('connection to mysql established');
  start();
});

function start() {
  connection.query("SELECT * FROM products", function(err, results){
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
      console.log('item number: ' + results[i].id + ' | ' + 'name: ' + results[i].name + ' | ' + 'price $' + results[i].price + '\n');
    }
    prompt();
  });
}

function prompt() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'What is the id of the item you wish to buy?',
      validate: function(value) {
        if (!isNaN(value)) {
          return true;
        }
        return false;
      }
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many would you like to buy?',
      validate: function(value) {
        if (!isNaN(value)) {
          return true;
        }
        return false;
      }
    }
    ]).then(function(user){
      connection.query('SELECT * from Products', function(err, results) {
        if (user.id > results.length) {
          console.log('that item does not exist, please select another.');
          prompt();
        } else {
          console.log('The item you wish to buy is item # ' + user.id);
          console.log('Quantity of: ' + user.quantity);
          purchaseId = user.id;
          purchaseQuantity = user.quantity;
        }
      })
    })
    checkOrder();
}
console.log();
function checkOrder() {
  // console.log('1)' + purchaseId);
  connection.query('SELECT * from Products', function(err, results) {
    if (err) throw err;
    var purchaseItem;
      for (var j = 0; j < results.length; j++) {
        if (results[j].id === purchaseId){
          purchaseItem = results[i];
          console.log(purchaseItem);
        }
      }
  })
};