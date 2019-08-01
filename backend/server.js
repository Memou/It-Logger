const express = require('express');
const connectDb = require('./config/db');
const path = require('path');

const app = express();

//Connect Database
connectDb();
app.use(express.json({ extended: false }));


// Define Routes

app.use('/api/logs', require('./routes/logs'));
app.use('/api/techs', require('./routes/techs'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname,'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
