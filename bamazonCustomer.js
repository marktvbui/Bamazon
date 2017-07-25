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
        for (var i = 0; i < results.length; i++) {
          if (results[i].name === answer.name) {
            chosenItem = results[i];
          }
        }
        if (parseInt(answer.quantity) < chosenItem.stock_quantity) {
          var newQuantity = chosenItem.stock_quantity - parseInt(answer.quantity);
          console.log(newQuantity);
          connection.query('UPDATE products SET ? WHERE ?',
            [
              {
                stock_quantity: newQuantity
              },
              {
                id: chosenItem.id
              }
            ], function(error) {
              if (error) throw err;
              console.log('Purchase successful!');
              start();
            });
        }
        else {
          console.log('Sorry we currently do not have that many stock of ' + chosenItem.name);
          return false;
          start();
        }
      })
  })
}



// function prompt(itemArray) {
//   inquirer.prompt([
//     {
//       name: 'id',
//       type: 'rawlist',
//       message: 'What is the id of the item you wish to buy?',
//       validate: function(value) {
//         if (!isNaN(value) && (!value)) {
//           if (value > itemArray) {
//           console.log('\nthat item does not exist, please try another');
//           return false;
//           }
//         return true;
//         }
//         return false;
//       }
//     },
//     {
//       type: 'input',
//       name: 'quantity',
//       message: 'How many would you like to buy?',
//       validate: function(value) {
//         if (!isNaN(value) && (!value)) {
//           return true;
//         }
//         return false;
//       }
//     }
//     ]).then(function(user){
//           console.log('The item you wish to buy is item # ' + user.id);
//           console.log('Quantity of: ' + user.quantity);
        //   var purchaseId = user.id;
        //   var purchaseQuantity = user.quantity;
        //   checkOrder(purchaseId, purchaseQuantity);
        // }
    })

}