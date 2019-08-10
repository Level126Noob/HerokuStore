const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs ({ defaultLayout : "main" }))
app.set("view engine", "handlebars");

const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });

  errorFunc = (err, data) => {
      if (err) {
          return res.status(500).send("It's broken dude");
      }
  }

  app.get("/", (_, res) => {
    connection.query("SELECT * FROM products", function(err, data) {
        if (err) {
            return res.status(500).send("it's broken dude");
        }

        res.render("index", { products: data });
    });
  });

  app.get("/:id", function(req, res) {
    connection.query("SELECT * FROM products where id = ?", [req.params.id], function(err, data) {
      if (err) {
        return res.status(500).send("it's broken dude");
      }
  
      console.log(data);
      res.render("products", data[0]);
    });
  });
  

  app.post("/api/products", function(req, res) {
    connection.query("INSERT INTO products (product_name, stock_quantity, price) VALUES (?, ?, ?)", [req.body.product_name, req.body.stock_quantity, req.body.price], function(err, result) {
      if (err) {
        return res.status(500).send("it's broken dude");
      }

      res.json({ id: result.insertId});
    })
  })
  
  

  app.delete("/api/products/:id", (req, res) => {
      connect.query("DELETE FROM products WHERE id = ?", [req.params.id], function(err, result) {
          if(err) {
              return res.status(500).send("it's broken dude");
          }
          else if (!result.affectedRows) {
              return res.status(404).send("404 dude");
          }
          res.status(200).end();
      });
  });

  app.put("api/products/:id", function(req, res) {
      connection.query("UPDATE products SET product_name = ?, stock_quantity = ?, price = ? WHERE id = ?",
      [req.body.product_name, req.body.stock_quantity, req.body.price,  req.body.id],
      function(err, result) {
          if (err) {
              return res.status(500).send("it's broken dude");
          }
          else if (!result.changedRows) {
              return res.status(404).send("404 dude");
          }
          res.status(200).end();
      });
  });
  

  app.listen(PORT, function() {
    console.log("The store is open on: http://localhost:" + PORT);
  });
  
