const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 30000 }
];

app.get("/", (req, res) => {
    res.send("Welcome to my server");
});

app.get("/products", (req, res) => {
    res.send(products);
});

app.get("/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = products.find((product) => product.id === parseInt(productId));
    
    if (product) {
        res.send(product);
    } else {
        res.status(404).send("Product not found");
    }
});

app.post("/products", (req, res) => {
    const newProduct = {
        id: products.length + 1, // Auto ID
        name: req.body.name,
        price: req.body.price
    };
    products.push(newProduct);
    res.status(201).send(newProduct); 
});

app.put("/products/:id", (req, res) => {
    const updatedProduct = req.body;
    const productId = req.params.id;
    const productIndex = products.findIndex((product) => product.id === parseInt(productId));
    
    if (productIndex === -1) {
        return res.status(404).send("Product not found");
    }
    
    products[productIndex] = updatedProduct;
    res.send(updatedProduct);
});

app.delete("/products/:id", (req, res) => {
    const productId = req.params.id;
    const productIndex = products.findIndex((product) => product.id === parseInt(productId));
    
    if (productIndex === -1) {
        return res.status(404).send("Product not found"); 
    }
    
    products.splice(productIndex, 1);
    res.send({ message: "Product deleted" }); 
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
