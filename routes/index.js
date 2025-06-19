const express = require("express");

// Import route modules
const animeListRoutes = require("./anime/animeList");
const animeMoviesListRoutes = require("./anime/animeMoviesList");
const animeSuggestionsRoutes = require("./suggestions/animeSuggestions");

const router = express.Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Anime4ume API is running!",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

// Mount route modules
router.use("/animeList", animeListRoutes);
router.use("/animeMoviesList", animeMoviesListRoutes);
router.use("/suggestions", animeSuggestionsRoutes);

// Legacy routes for backward compatibility
router.use("/animeSuggestions", animeSuggestionsRoutes);
router.use("/animesuggestions", animeSuggestionsRoutes);

module.exports = router;
