const Movie = require("../models/Movie");

exports.getMovies = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const movies = await Movie.find().skip(skip).limit(limit);

  const total = await Movie.countDocuments();

  res.json({
    total,
    page,
    totalPages: Math.ceil(total / limit),
    movies,
  });
};

exports.getMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
};

exports.searchMovies = async (req, res) => {
  const { q } = req.query;

  const movies = await Movie.find({
    title: { $regex: `^${q}`, $options: "i" },
  });

  res.json(movies);
};

exports.sortMovies = async (req, res) => {
  const { sortBy, order } = req.query;
  const sortOrder = order === "desc" ? -1 : 1;

  const movies = await Movie.find().sort({ [sortBy]: sortOrder });
  res.json(movies);
};

exports.addMovie = async (req, res) => {
  const movie = await Movie.create(req.body);
  res.status(201).json(movie);
};

exports.updateMovie = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(movie);
};

exports.deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Movie deleted" });
};
