const express = require("express");
const cors = require("cors");
const products = require("./products");

const app = express();

// Enable CORS for React frontend
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Azure App Service Product API is running");
});

/**
 * GET all products
 */
app.get("/api/products", (req, res) => {
  res.json(products);
});

/**
 * GET single product by ID
 */
app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});