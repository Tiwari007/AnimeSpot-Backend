const express = require("express");
const AnimeMoviesList = require("../../models/AnimeMoviesList");

const router = express.Router();

// GET all anime movies
router.get("/", async (req, res) => {
  try {
    const animeMovies = await AnimeMoviesList.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: animeMovies.length,
      data: animeMovies
    });
  } catch (error) {
    console.error("Error fetching anime movies:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch anime movies" 
    });
  }
});

// GET anime movie by ID
router.get("/:id", async (req, res) => {
  try {
    const movie = await AnimeMoviesList.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: "Anime movie not found"
      });
    }

    res.json({
      success: true,
      data: movie
    });
  } catch (error) {
    console.error("Error fetching anime movie by ID:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch anime movie"
    });
  }
});

// POST - Add new anime movie
router.post("/", async (req, res) => {
  try {
    const { title, description, image, sourceUrl, genres, status, releaseYear, rating } = req.body;

    // Validation
    if (!title || !description || !image || !sourceUrl) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields. Please provide title, description, image, and sourceUrl."
      });
    }

    // Create new anime movie
    const newMovie = new AnimeMoviesList({
      title: title.trim(),
      description: description.trim(),
      image,
      sourceUrl,
      genres: genres || [],
      status: status || 'ongoing',
      duration: duration || 0,
      releaseYear: releaseYear || new Date().getFullYear(),
      rating: rating || 'NA'
    });

    // Save to database
    const savedMovie = await newMovie.save();

    res.status(201).json({
      success: true,
      message: "Anime movie added successfully!",
      data: savedMovie
    });

  } catch (error) {
    console.error("Error adding anime movie:", error);
    
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

// PUT - Update anime movie
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedMovie = await AnimeMoviesList.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({
        success: false,
        error: "Anime movie not found"
      });
    }

    res.json({
      success: true,
      message: "Anime movie updated successfully!",
      data: updatedMovie
    });

  } catch (error) {
    console.error("Error updating anime movie:", error);
    
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

// DELETE - Remove anime movie
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMovie = await AnimeMoviesList.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res.status(404).json({
        success: false,
        error: "Anime movie not found"
      });
    }

    res.json({
      success: true,
      message: "Anime movie deleted successfully!",
      data: deletedMovie
    });

  } catch (error) {
    console.error("Error deleting anime movie:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error. Please try again later."
    });
  }
});

module.exports = router;
