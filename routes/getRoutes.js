const express = require("express");
const AnimeList = require("../models/AnimeList");
const AnimeMoviesList = require("../models/AnimeMoviesList");
const AnimeSuggestion = require("../models/AnimeSuggestion");

const router = express.Router();

// GET anime series only
router.get("/animeList", async (req, res) => {
  try {
    const animeList = await AnimeList.find();
    res.json(animeList);
  } catch (error) {
    console.error("Error fetching anime list:", error);
    res.status(500).json({ error: "Failed to fetch anime list" });
  }
});

// GET anime movies only
router.get("/animeMoviesList", async (req, res) => {
  try {
    const animeMovies = await AnimeMoviesList.find();
    res.json(animeMovies);
  } catch (error) {
    console.error("Error fetching anime movies:", error);
    res.status(500).json({ error: "Failed to fetch anime movies" });
  }
});

// GET all anime suggestions
router.get("/animeSuggestions", async (req, res) => {
  try {
    const suggestions = await AnimeSuggestion.find({}).sort({ submittedAt: -1 });
    res.json(suggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

// POST route for anime suggestions
router.post("/animesuggestions", async (req, res) => {
  try {
    const { email, animeName, animeReason } = req.body;

    // Validation
    if (!email || !animeName || !animeReason) {
      return res.status(400).json({
        error: "Missing required fields. Please provide email, animeName, and animeReason."
      });
    }

    // Create new suggestion
    const suggestion = new AnimeSuggestion({
      email,
      animeName,
      animeReason
    });

    // Save to database
    const savedSuggestion = await suggestion.save();

    // Return success response
    res.status(201).json({
      message: "Anime suggestion submitted successfully!",
      suggestion: savedSuggestion
    });

  } catch (error) {
    console.error("Error submitting anime suggestion:", error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        error: "Validation failed",
        details: validationErrors
      });
    }

    res.status(500).json({
      error: "Internal server error. Please try again later."
    });
  }
});

// POST route to add new anime (admin functionality)
router.post("/anime", async (req, res) => {
  try {
    const { title, description, image, sourceUrl, category } = req.body;

    // Validation
    if (!title || !description || !image || !sourceUrl) {
      return res.status(400).json({
        error: "Missing required fields. Please provide title, description, image, and sourceUrl."
      });
    }

    // Create new anime
    const anime = new Anime({
      title,
      description,
      image,
      sourceUrl,
      category: category || 'series'
    });

    // Save to database
    const savedAnime = await anime.save();

    res.status(201).json({
      message: "Anime added successfully!",
      anime: savedAnime
    });

  } catch (error) {
    console.error("Error adding anime:", error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        error: "Validation failed",
        details: validationErrors
      });
    }

    res.status(500).json({
      error: "Internal server error. Please try again later."
    });
  }
});

// PUT route to update anime
router.put("/anime/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedAnime = await Anime.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedAnime) {
      return res.status(404).json({ error: "Anime not found" });
    }

    res.json({
      message: "Anime updated successfully!",
      anime: updatedAnime
    });

  } catch (error) {
    console.error("Error updating anime:", error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        error: "Validation failed",
        details: validationErrors
      });
    }

    res.status(500).json({
      error: "Internal server error. Please try again later."
    });
  }
});

// DELETE route to remove anime
router.delete("/anime/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAnime = await Anime.findByIdAndDelete(id);

    if (!deletedAnime) {
      return res.status(404).json({ error: "Anime not found" });
    }

    res.json({
      message: "Anime deleted successfully!",
      anime: deletedAnime
    });

  } catch (error) {
    console.error("Error deleting anime:", error);
    res.status(500).json({
      error: "Internal server error. Please try again later."
    });
  }
});

module.exports = router;