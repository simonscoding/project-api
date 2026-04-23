const express = require("express");
const cors = require("cors");
const { CosmosClient } = require("@azure/cosmos");

const app = express();
app.use(cors());
app.use(express.json());

// Cosmos DB config
const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;

const client = new CosmosClient(connectionString);
const database = client.database("products-db");
const container = database.container("products");

// GET all products
app.get("/api/products", async (req, res) => {
  try {
    const query = {
      query: "SELECT * FROM c"
    };

    const { resources } = await container.items.query(query).fetchAll();
    res.json(resources);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching products");
  }
});

// GET product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { resource } = await container.item(id, id).read();

    if (!resource) {
      return res.status(404).send("Product not found");
    }

    res.json(resource);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching product");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});