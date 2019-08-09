const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
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

  
  
  
  app.get("/", (req, res) => {
    connection.query("SELECT * FROM products;", function(err, data) {
      if (err) {
        return res.status(500).end();
      }
  
      res.render("index", { products: data });
    });
  });
  
  // Create a new product
  app.post("/api/products", (req, res) => {
    connection.query("INSERT INTO products (product) VALUES (?)", [req.body.product], function(err, result) {
      if (err) {
        return res.status(500).end();
      }
  
      res.json({ id: result.insertId });
      console.log({ id: result.insertId });
    });
  });
  
  // Update a product
  app.put("/api/products/:id", (req, res) => {
    connection.query("UPDATE products SET product = ? WHERE id = ?", [req.body.product, req.params.id], function(err, result) {
      if (err) {
        return res.status(500).end();
      }
      else if (result.changedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();
  
    });
  });
  
  app.delete("/api/products/:id", (req, res) => {
    connection.query("DELETE FROM products WHERE id = ?", [req.params.id], function(err, result) {
      if (err) {
        return res.status(500).end();
      }
      else if (result.affectedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();
  
    });
  });
  
  app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
  