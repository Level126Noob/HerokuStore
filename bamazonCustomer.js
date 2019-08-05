const mysql = require("mysql");
const inquirer = require("inquirer")

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

const errorFunc = err => {
    if (err) {
        throw err;
    }
};

connection.connect(errorFunc());

inquirer.prompt([{
        type: "input",
        message: "What is the Store ID of the product would you like to purchase?",
        name: "id"
    },
    {
        type: "number",
        message: "How many units of the product would you like to purchase?",
        name: "amount"
    }

]).then(function (userInput) {
    let query = "SELECT * FROM products WHERE ?"
    connection.query(query, {
            item_id: userInput.id
        },
        function (err, res) {
            if (err) {
                throw err
            }

            for (let i = 0; i < res.length; i++) {
                let item = res[i].item_id
                let name = res[i].product_name
                let price = res[i].price
                let stock = res[i].stock_quantity
                let itemsLeft = stock - userInput.amount

                console.log(
                    "item_id: " + item +
                    " || product_name: " + name +
                    " || price: " + price +
                    " || stock_quantity: " + stock
                )



                let createTotal = () => {
                    let total = price * userInput.amount
                    console.log("Your total is: " + total + " Dollars please!")
                }

                let changeInventory = () => {
                    console.log("Changing inventory in the database!\n");
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [{
                                stock_quantity: itemsLeft
                            },
                            {
                                item_id: userInput.id
                            },
                            errorFunc()
                        ]
                    )
                }

                let storeBrain = () => {
                    stock < 0 ? deleteInventory() :
                        console.log("Welcome to the store!");

                    stock < userInput.amount ? console.log("Sorry we don't have that many items in stock, try buying a little less!") :
                        console.log(itemsLeft + " Items remaining!...\n");

                    stock >= userInput.amount ? changeInventory() : console.log("Or you can always buy something else!");

                    stock >= userInput.amount ? createTotal() : console.log("Let me check if we have that in stock!");

                    stock === 0 || null ? deleteInventory() :
                        console.log("Thanks for shopping!");


                };
                storeBrain();
            }
            res.length === 0 ? console.log("Sorry that item is no longer in stock. Try buying something else with a product_id of #1-10!") : console.log("Have a nice day!");
        })

    let deleteInventory = () => {
        console.log("Sorry we are all out of that item!\n");
        connection.query(
            "DELETE FROM products WHERE ?", {
                item_id: userInput.id
            },
            errorFunc(),
            console.log("Item deleted from database!\n")
        )
    };
});