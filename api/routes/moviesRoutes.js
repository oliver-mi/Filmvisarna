const express = require("express");
const router = express.Router();

const moviesController = require("../controllers/moviesController");

router.get("/:movieId", moviesController.getMovieById);
router.get("/search", moviesController.getSearchedMovies);
router.get("", moviesController.getAllMovies);

module.exports = router;
