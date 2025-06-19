const mongoose = require('mongoose');
require('dotenv').config();
const Anime = require('./models/AnimeList');
const animeData = require('./data/animeData');
const animeMoviesData = require('./data/animeMoviesData');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas - Database: Anime4ume');

    // Clear existing data from animedata collection
    await Anime.deleteMany({});
    console.log('Cleared existing anime data from animedata collection');

    // Prepare series data
    const seriesData = animeData.map(anime => ({
      ...anime,
      category: 'series'
    }));

    // Prepare movies data
    const moviesData = animeMoviesData.map(anime => ({
      ...anime,
      category: 'movie'
    }));

    // Combine and insert data into animedata collection
    const allAnimeData = [...seriesData, ...moviesData];
    await Anime.insertMany(allAnimeData);
    
    console.log(`Successfully seeded ${allAnimeData.length} anime records to animedata collection`);
    console.log(`- Series: ${seriesData.length}`);
    console.log(`- Movies: ${moviesData.length}`);
    console.log('Database: Anime4ume, Collection: animedata');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDatabase();
