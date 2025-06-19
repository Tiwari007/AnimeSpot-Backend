const express = require("express");
const AnimeList = require("../../models/AnimeList");

const router = express.Router();

// GET all anime series
router.get("/", async (req, res) => {
  try {
    const animeList = await AnimeList.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: animeList.length,
      data: animeList
    });
  } catch (error) {
    console.error("Error fetching anime list:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch anime list" 
    });
  }
});

// GET anime series by ID
router.get("/:id", async (req, res) => {
  try {
    const anime = await AnimeList.findById(req.params.id);
    
    if (!anime) {
      return res.status(404).json({
        success: false,
        error: "Anime not found"
      });
    }

    res.json({
      success: true,
      data: anime
    });
  } catch (error) {
    console.error("Error fetching anime by ID:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch anime"
    });
  }
});

// POST - Add new anime series
router.post("/", async (req, res) => {
  try {
    const { title, description, image, sourceUrl, genres, status, episodes } = req.body;

    // Validation
    if (!title || !description || !image || !sourceUrl) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields. Please provide title, description, image, and sourceUrl."
      });
    }

    // Create new anime series
    const newAnime = new AnimeList({
      title: title.trim(),
      description: description.trim(),
      image,
      sourceUrl,
      genres: genres || [],
      status: status || 'ongoing',
      episodes: episodes || 0,
      rating: rating || 0
    });

    // Save to database
    const savedAnime = await newAnime.save();

    res.status(201).json({
      success: true,
      message: "Anime series added successfully!",
      data: savedAnime
    });

  } catch (error) {
    console.error("Error adding anime series:", error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      error: "Internal server error. Please try again later."
    });
  }
});

// PUT - Update anime series
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedAnime = await AnimeList.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedAnime) {
      return res.status(404).json({
        success: false,
        error: "Anime not found"
      });
    }

    res.json({
      success: true,
      message: "Anime series updated successfully!",
      data: updatedAnime
    });

  } catch (error) {
    console.error("Error updating anime series:", error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      error: "Internal server error. Please try again later."
    });
  }
});

// DELETE - Remove anime series
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAnime = await AnimeList.findByIdAndDelete(id);

    if (!deletedAnime) {
      return res.status(404).json({
        success: false,
        error: "Anime not found"
      });
    }

    res.json({
      success: true,
      message: "Anime series deleted successfully!",
      data: deletedAnime
    });

  } catch (error) {
    console.error("Error deleting anime series:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error. Please try again later."
    });
  }
});

module.exports = router;
