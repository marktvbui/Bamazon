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

function start(){
  inquirer.prompt
  ([
    {
      name: 'menu',
      type: 'list',
      choices: ['Current Products', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Delete Product', 'Exit'],
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

      case 'Delete Product':
        deleteProduct();
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
      console.log('\nproduct id: ' + results[i].id + ' | ' + 'product name: ' + results[i].name + ' | ' + 'department: ' + results[i].department + ' | ' + 'price $' + results[i].price + ' | ' + 'inventory: ' + results[i].inventory);
    }
  })
  start();
}

function lowInventory() {
  connection.query('SELECT * FROM products WHERE inventory <= 5', function(err, results) {
    if (err) throw err;
    for (var i = 0; i < results.length; i++) {
      console.log('\nproduct name: ' + results[i].name + ' | ' + 'inventory: ' + results[i].inventory);
    }
  })
  start();
}

function addInventory() {
  connection.query('SELECT * FROM products', function(err, results) {
    if (err) throw err;
    inquirer.prompt([
    {
      name: 'name',
      type: 'list',
      choices: function() {
        var productsArray = [];
        for (var i = 0; i < results.length; i++) {
          productsArray.push(results[i].name);
        }
        return productsArray;
      },
      message: 'What item would you like to add more inventory to?'
    },
    {
      name: 'quantity',
      type: 'input',
      message: 'How much more inventory do we have?',
      validate: function(value){
        return !isNaN(value);
      }
    }
    ])
    .then(function(answer){
      var chosenProduct;
      for (var i = 0; i < results.length; i++) {
        if (results[i].name === answer.name) {
          chosenProduct = results[i];
        }
      }
    var newInventory = parseInt(answer.quantity) + chosenProduct.inventory;
    connection.query('UPDATE products SET ? WHERE ?',
      [
        {
          inventory: newInventory
        },
        {
          id: chosenProduct.id
        }
      ], function(error) {
        if (error) throw error;
        console.log('We have added ' + answer.quantity + '. Bringing our total inventory to ' + newInventory +  ' ' + chosenProduct.name + 's.');
        start();
      })
    })
  })
}

function newProducts() {
  inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: 'What is the name of the new product?'
    },
    {
      name: 'department',
      type: 'input',
      message: 'What department does the product belong to?'
    },
    {
      name: 'price',
      type: 'input',
      message: 'What is the price of the new product?',
      validate: function(value){
        return !isNaN(value);
      }
    },
    {
      name: 'inventory',
      type: 'input',
      message: 'How much inventory do we have?'
    }
    ]).then(function(results) {
      connection.query("INSERT INTO products SET ?",
        {
          name: results.name,
          department: results.department,
          price: results.price,
          inventory: results.inventory
        }, function(err, res) {
          console.log(res.affectedRows + ' new product inserted' + '\n');
          start();
        }
      )
    })
}

function deleteProduct() {
  connection.query('SELECT * FROM products', function(err, results) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: 'name',
        type: 'list',
        choices: function() {
          var deleteArray = [];
          for (var i = 0; i < results.length; i++) {
            deleteArray.push(results[i].name);
          }
          return deleteArray;
        },
        message: 'What item do we no longer sell?'
      }
    ])
    .then(function(answer){
      var pickedProduct;
      for (var i = 0; i < results.length; i++) {
        if (results[i].name === answer.name) {
          pickedProduct = results[i];
        }
      }
      connection.query('DELETE FROM products WHERE ?',
        [{
          id: pickedProduct.id
        }], function(error) {
          if (error) throw error;
          console.log('Item will no longer be sold!');
          start();
        }
      )
    })
  })
}