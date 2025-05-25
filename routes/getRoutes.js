const express = require("express");
const animeData = require("../data/animeData");
const animeList = require("../data/animeList");
const animeMoviesData = require("../data/animeMoviesData");

const router = express.Router();

router.get("/animeData", (req, res) => {
  res.json(animeData);
});

router.get("/animeList", (req, res) => {
  res.json(animeList);
});

router.get("/animeMoviesData", (req, res) => {
  res.json(animeMoviesData);
});

module.exports = router;