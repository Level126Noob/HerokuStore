const mysql = require("mysql");
const inquirer = require("inquirer")

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

const errorFunc= err => {
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
    }, function (err, res) {
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

            if (stock === 0 || null) {
                deleteInventory();
            }

            function createTotal() {
                let total = price * userInput.amount
                console.log("Your total is: " + total + " Dollars please!")
            }
            
            function changeInventory() {
                console.log("Changing inventory in the database!\n");
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [{
                            stock_quantity: itemsLeft
                        },
                        {
                            item_id: userInput.id
                        },
                       errorFunc(),
                            console.log("Item inventory updated in the system!\n")
                        
                    ]
                )
            }


            if (stock < userInput.amount) {
                console.log("Sorry we don't have that many items in stock, try buying a little less!")
            } else {
                console.log(itemsLeft + " Items remaining!...\n")
                createTotal();
                changeInventory();
            }
        }

    })

    function deleteInventory() {
        console.log("Deleting item from the database...\n");
        connection.query(
            "DELETE FROM products WHERE ?", {
                item_id: userInput.id
            },
            errorFunc(),
                console.log("Item deleted from database!\n")
            
        )
    }
});