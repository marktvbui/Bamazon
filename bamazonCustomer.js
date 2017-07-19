var inquirer = require("inquirer");

inquirer.prompt([
  {
    type: 'input',
    name: 'item',
    message: 'What is the id of the item you wish to buy?'
  },
  {
    type: 'input',
    name: 'quantity',
    message: 'How many would you like to buy?'
  }
  ]).then(function(user){
    console.log('The item you wish to buy is item # : ' + user.item);
    console.log('Quantity of: ' + user.quantity);
  })
