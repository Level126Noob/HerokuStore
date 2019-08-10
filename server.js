const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}))
app.set("view engine", "handlebars");

const mysql = require("mysql");

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon'
  })
}

connection.connect( (err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

app.get("/", (_, res) => {
  connection.query("SELECT * FROM products", function (err, data) {
    if (err) {
      return res.status(500).send("it's broken dude");
    }

    res.render("index", {
      products: data
    });
  });
});

app.get("/:id", (req, res) => {
  connection.query("SELECT * FROM products where id = ?", [req.params.id], function (err, data) {
    if (err) {
      return res.status(500).send("it's broken dude");
    }

    console.log(data);
    res.render("products", data[0]);
  });
});


app.post("/api/products", (req, res) => {
  connection.query("INSERT INTO products (product_name, stock_quantity, price) VALUES (?, ?, ?)", [req.body.product_name, req.body.stock_quantity, req.body.price], function (err, result) {
    if (err) {
      return res.status(500).send("it's broken dude");
    }

    res.json({
      id: result.insertId
    });
  })
})


app.delete("/api/products/:id", (req, res) => {
  connection.query("DELETE FROM products WHERE id = ?", [req.params.id], function (err, result) {
    if (err) {
      return res.status(500).send("it's broken dude");
    } else if (!result.affectedRows) {
      return res.status(404).send("404 dude");
    }
    res.status(200).end();
  });
});

app.put("/api/products/:id", (req, res) => {
  connection.query("UPDATE products SET product_name = ?, stock_quantity = ?, price = ? WHERE id = ?",
    [req.body.product_name, req.body.stock_quantity, req.body.price, req.params.id],
    function (err, result) {
      if (err) {
        return res.status(500).send("it's broken dude");
      } else if (!result.changedRows) {
        console.log("whatever")
        return res.status(404).send("404 dude");
        
      }
      res.status(200).end();
    });
});


app.listen(PORT, () => {
   console.log("The store is open on: http://localhost:" + PORT);
});