const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

module.exports = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};