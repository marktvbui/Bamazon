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
  console.log('connection to database confirmed, you are ready to go Sir!');
  start();
});

  // * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

  // * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

  // * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

  // * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

function start(){
  inquirer.prompt
  ([
    {
      name: 'menu',
      type: 'list',
      choices: ['Current Products', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
      message: 'Sir, what report would you like to access?'
    }
  ]).then(function(answer){
      console.log(answer);
      })
}



