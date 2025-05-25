const express = require("express");
const router = express.Router();

let items = []; // You may want to move this to a database later

// Create
router.post("/", (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  items[id] = updatedItem;
  res.json(updatedItem);
});

// Delete
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  items.splice(id, 1);
  res.status(204).send();
});

module.exports = router;