const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let items = []; // Temporary in-memory storage

// Create
app.post("/items", (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Read
app.get("/items", (req, res) => {
  res.json(items);
});

// Update
app.put("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  items[id] = updatedItem;
  res.json(updatedItem);
});

// Delete
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  items.splice(id, 1);
  res.status(204).send();
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
