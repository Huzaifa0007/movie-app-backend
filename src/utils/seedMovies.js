const Movie = require("../models/Movie");

const seedMovies = async (movies) => {
  setTimeout(async () => {
    await Movie.insertMany(movies);
    console.log("Movies inserted asynchronously");
  }, 3000);
};

module.exports = seedMovies;
