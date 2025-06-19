const express = require("express");
const AnimeSuggestion = require("../../models/AnimeSuggestion");

const router = express.Router();

// GET all anime suggestions
router.get("/", async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    // Build query filter
    const filter = {};
    if (status) {
      filter.status = status;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    
    const suggestions = await AnimeSuggestion.find(filter)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await AnimeSuggestion.countDocuments(filter);

    res.json({
      success: true,
      count: suggestions.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: suggestions
    });
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch suggestions"
    });
  }
});

// GET suggestion by ID
router.get("/:id", async (req, res) => {
  try {
    const suggestion = await AnimeSuggestion.findById(req.params.id);
    
    if (!suggestion) {
      return res.status(404).json({
        success: false,
        error: "Suggestion not found"
      });
    }

    res.json({
      success: true,
      data: suggestion
    });
  } catch (error) {
    console.error("Error fetching suggestion by ID:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch suggestion"
    });
  }
});

// POST - Submit new anime suggestion
router.post("/", async (req, res) => {
  try {
    const { email, animeName, animeReason } = req.body;

    // Validation
    if (!email || !animeName || !animeReason) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields. Please provide email, animeName, and animeReason."
      });
    }

    // Create new suggestion
    const suggestion = new AnimeSuggestion({
      email: email.trim().toLowerCase(),
      animeName: animeName.trim(),
      animeReason: animeReason.trim()
    });

    // Save to database
    const savedSuggestion = await suggestion.save();

    res.status(201).json({
      success: true,
      message: "Anime suggestion submitted successfully!",
      data: savedSuggestion
    });

  } catch (error) {
    console.error("Error submitting anime suggestion:", error);
    
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

// PUT - Update suggestion status (admin functionality)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['pending', 'reviewed', 'approved', 'rejected'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const updatedSuggestion = await AnimeSuggestion.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedSuggestion) {
      return res.status(404).json({
        success: false,
        error: "Suggestion not found"
      });
    }

    res.json({
      success: true,
      message: "Suggestion status updated successfully!",
      data: updatedSuggestion
    });

  } catch (error) {
    console.error("Error updating suggestion:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error. Please try again later."
    });
  }
});

// DELETE - Remove suggestion
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSuggestion = await AnimeSuggestion.findByIdAndDelete(id);

    if (!deletedSuggestion) {
      return res.status(404).json({
        success: false,
        error: "Suggestion not found"
      });
    }

    res.json({
      success: true,
      message: "Suggestion deleted successfully!",
      data: deletedSuggestion
    });

  } catch (error) {
    console.error("Error deleting suggestion:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error. Please try again later."
    });
  }
});

module.exports = router;
