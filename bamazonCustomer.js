var inquirer = require("inquirer");
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
  console.log('connection to mysql established');
  start();
});

function start() {
  connection.query('SELECT * FROM products', function(err, results){
    if (err) throw err;
    inquirer.prompt([
    {
      name: 'name',
      type: 'list',
      choices: function(){
        var choiceArray = [];
        for (var i = 0; i < results.length; i++) {
          choiceArray.push(results[i].name);
        }
        return choiceArray;
      },
      message: 'What item would you like to buy?'
    },
    {
      name: 'quantity',
      type: 'input',
      message: 'How many would you like to buy?',
      validate: function(value){
        return !isNaN(value);
      }
    }
    ])
    .then(function(answer){
        var chosenItem;
        var purchaseQuantity;
        var newQuantity;
        var itemPrice;
        var purchasePrice;
        var sales;
        for (var i = 0; i < results.length; i++) {
          if (results[i].name === answer.name) {
            chosenItem = results[i];
          }
        }
        if (parseInt(answer.quantity) <= chosenItem.inventory) {
          purchaseQuantity = answer.quantity;
          newQuantity = chosenItem.inventory - parseInt(purchaseQuantity);
          itemPrice = chosenItem.price;
          purchasePrice = purchaseQuantity * chosenItem.price;
          sales = chosenItem.product_sales + purchasePrice;

          connection.query('UPDATE products SET ? WHERE ?',
            [
              // {
              //   inventory: newQuantity
              // },

              {
                id: chosenItem.id
              }
            ], function(error) {
              if (error) throw error;
              console.log('Today\'s total comes to $' + purchasePrice);
              start();
            });
        }
        else {
          console.log('Sorry we currently do not have that many stock of ' + chosenItem.name);
          start();
        }
      })
  })
}
