require('dotenv').config({ path: './src//config/config.env' });
const mongoose = require('mongoose');
const app = require('./app');

const DB_CONNTCT_URI = process.env.DB_CONNECTION_URI.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD,
);
// Connect to MongoDB
mongoose
  .connect(DB_CONNTCT_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log('Task-API :: Success :: MongoDB connected successful'),
  )
  .catch((err) =>
    console.error('Task-API :: Error :: MongoDB connection error:', err),
  );

// Start server
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on('unhandleRejection', (err) => {
  console.log(`Task-API :: Error :: unhandleRejection ${err}`);
  server.close(() => {
    process.exit(1);
  });
});
