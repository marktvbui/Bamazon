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
      choices: ['Current Products', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit'],
      message: 'Sir, what report would you like to access?'
    }
  ])
  .then(function(answer){
    switch (answer.menu) {
      case 'Current Products':
        currentProducts();
        break;

      case 'View Low Inventory':
        lowInventory();
        break;

      case 'Add to Inventory':
        addInventory();
        break;

      case 'Add New Product':
        newProducts();
        break;

      case 'Exit':
        console.log('Good Bye');
        connection.end();
        break;
    }
  })
}

function currentProducts() {
  connection.query('SELECT * FROM products', function(err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
      console.log('\nproduct id: ' + results[i].id + ' | ' + 'product name: ' + results[i].name + ' | ' + 'department: ' + results[i].department + ' | ' + 'price $' + results[i].price + ' | ' + 'inventory: ' + results[i].stock_quantity);
    }
  })
  start();
}

function lowInventory() {
  console.log('low inventory');
  start();
}

function addInventory() {
  console.log('add inventory');
  start();
}

function newProducts() {
  console.log('new products');
  start();
}