const mongoose = require('mongoose');

const connectDB = async () => {
  const connectionString = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/book_review_db';
  
  try {
    await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;