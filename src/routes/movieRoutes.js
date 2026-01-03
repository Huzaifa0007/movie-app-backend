const express = require("express");
const {
  getMovies,
  searchMovies,
  sortMovies,
  addMovie,
  updateMovie,
  deleteMovie,
  getMovieById,
} = require("../controllers/movieController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getMovies);
router.get("/search", searchMovies);
router.get("/sorted", sortMovies);
router.get("/:id", getMovieById);

router.post("/", auth, role("admin"), addMovie);
router.put("/:id", auth, role("admin"), updateMovie);
router.delete("/:id", auth, role("admin"), deleteMovie);

module.exports = router;
